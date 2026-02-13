/**
 * POST /api/auth/logout
 * Hapus cookie auth_token.
 */

import { NextResponse } from "next/server";
import { ok } from "@/lib/apiUtils";

export async function POST() {
  const res = NextResponse.json(ok(null, "Logout berhasil."));
  res.cookies.set("auth_token", "", { httpOnly: true, expires: new Date(0), path: "/" });
  return res;
}
