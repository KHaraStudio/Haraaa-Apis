/**
 * GET /api/tools/hash/md5?text=HelloWorld
 * Kembalikan MD5, SHA1, SHA256 dari input teks.
 */

import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { withApiAuth, ApiCtx } from "@/middleware/withApiAuth";
import { ok, fail } from "@/lib/apiUtils";

async function handler(req: NextRequest, _ctx: ApiCtx): Promise<NextResponse> {
  const text = new URL(req.url).searchParams.get("text");
  if (!text) return NextResponse.json(fail("Parameter ?text= wajib diisi."), { status: 400 });
  if (text.length > 50_000) return NextResponse.json(fail("Teks maksimal 50.000 karakter."), { status: 400 });

  const hash = (alg: string) => createHash(alg).update(text, "utf8").digest("hex");

  return NextResponse.json(
    ok({
      input: text,
      hashes: { md5: hash("md5"), sha1: hash("sha1"), sha256: hash("sha256") },
    })
  );
}

export const GET = withApiAuth(handler, "/api/tools/hash/md5");
