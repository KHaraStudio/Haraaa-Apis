/**
 * GET /api/tools/base64/encode?text=HelloWorld
 * Encode teks ke Base64.
 */

import { NextRequest, NextResponse } from "next/server";
import { withApiAuth, ApiCtx } from "@/middleware/withApiAuth";
import { ok, fail } from "@/lib/apiUtils";

async function handler(req: NextRequest, _ctx: ApiCtx): Promise<NextResponse> {
  const text = new URL(req.url).searchParams.get("text");
  if (!text) return NextResponse.json(fail("Parameter ?text= wajib diisi."), { status: 400 });
  if (text.length > 10_000) return NextResponse.json(fail("Teks maksimal 10.000 karakter."), { status: 400 });

  const encoded = Buffer.from(text, "utf-8").toString("base64");
  return NextResponse.json(ok({ original: text, encoded, charCount: { original: text.length, encoded: encoded.length } }));
}

export const GET = withApiAuth(handler, "/api/tools/base64/encode");
