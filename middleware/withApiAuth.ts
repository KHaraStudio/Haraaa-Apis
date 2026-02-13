/**
 * middleware/withApiAuth.ts
 * Higher-order handler yang:
 *  1. Membaca Bearer token dari Authorization header
 *  2. Mencari API key di database
 *  3. Cek rate limit
 *  4. Memanggil handler asli jika lolos
 *  5. Mencatat request ke ApiLog secara async
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkRateLimit, fail, getClientIp, RATE_LIMIT } from "@/lib/apiUtils";
import { extractBearer } from "@/lib/auth";

export interface ApiCtx {
  userId: string;
  apiKey: string;
}

type Handler = (req: NextRequest, ctx: ApiCtx) => Promise<NextResponse>;

/**
 * Bungkus handler dengan validasi API key + rate limit.
 * @param handler  - fungsi handler asli
 * @param endpoint - string path untuk logging (mis. "/api/quote/random")
 */
export function withApiAuth(handler: Handler, endpoint: string) {
  return async (req: NextRequest): Promise<NextResponse> => {
    // 1. Ambil token dari header Authorization
    const apiKey = extractBearer(req.headers.get("authorization"));

    if (!apiKey) {
      return NextResponse.json(
        fail("API key diperlukan. Tambahkan header: Authorization: Bearer API_KEY", 401),
        { status: 401 }
      );
    }

    // 2. Cek rate limit SEBELUM query DB (hemat resources)
    const rl = checkRateLimit(apiKey);
    const rlHeaders = {
      "X-RateLimit-Limit": String(RATE_LIMIT),
      "X-RateLimit-Remaining": String(rl.remaining),
      "X-RateLimit-Reset": String(rl.resetAt),
    };

    if (!rl.allowed) {
      const retryAfterSec = Math.ceil((rl.resetAt - Date.now()) / 1000);
      return NextResponse.json(
        fail(`Batas rate limit terlampaui (${RATE_LIMIT} req/jam). Coba lagi dalam ${Math.ceil(retryAfterSec / 60)} menit.`, 429),
        { status: 429, headers: { ...rlHeaders, "Retry-After": String(retryAfterSec) } }
      );
    }

    // 3. Cari API key di database
    const user = await prisma.user.findUnique({
      where: { apiKey },
      select: { id: true, apiKey: true },
    });

    if (!user) {
      return NextResponse.json(
        fail("API key tidak valid atau tidak ditemukan.", 401),
        { status: 401, headers: rlHeaders }
      );
    }

    // 4. Jalankan handler asli
    const ctx: ApiCtx = { userId: user.id, apiKey: user.apiKey };
    const response = await handler(req, ctx);

    // 5. Log request secara async (tidak memblokir response)
    logRequest(user.id, endpoint, req, response.status).catch(console.error);

    // Tambahkan rate limit headers ke response
    rlHeaders["X-RateLimit-Remaining"] = String(rl.remaining);
    Object.entries(rlHeaders).forEach(([k, v]) => response.headers.set(k, v));

    return response;
  };
}

/** Tulis log ke database secara async */
async function logRequest(
  userId: string,
  endpoint: string,
  req: NextRequest,
  status: number
): Promise<void> {
  await prisma.apiLog.create({
    data: {
      userId,
      endpoint,
      method: req.method,
      ip: getClientIp(req.headers),
      userAgent: req.headers.get("user-agent") ?? undefined,
      status,
    },
  });
}
