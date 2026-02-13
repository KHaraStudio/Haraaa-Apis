/**
 * GET /api/tools/base64/decode?text=SGVsbG9Xb3JsZA==
 * Decode Base64 ke teks.
 */

import { NextRequest, NextResponse } from "next/server";
import { withApiAuth, ApiCtx } from "@/middleware/withApiAuth";
import { ok, fail } from "@/lib/apiUtils";

async function handler(req: NextRequest, _ctx: ApiCtx): Promise<NextResponse> {
  const text = new URL(req.url).searchParams.get("text");
  if (!text) return NextResponse.json(fail("Parameter ?text= wajib diisi (Base64 string)."), { status: 400 });

  // Validasi format Base64
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(text)) {
    return NextResponse.json(fail("Input bukan Base64 yang valid."), { status: 400 });
  }

  try {
    const decoded = Buffer.from(text, "base64").toString("utf-8");
    return NextResponse.json(ok({ encoded: text, decoded, charCount: { encoded: text.length, decoded: decoded.length } }));
  } catch {
    return NextResponse.json(fail("Gagal mendecode. Pastikan input adalah Base64 valid."), { status: 400 });
  }
}

export const GET = withApiAuth(handler, "/api/tools/base64/decode");
