/**
 * middleware/withAuth.ts
 * Helper untuk endpoint dashboard yang membutuhkan cookie auth.
 * Berbeda dari withApiAuth — ini untuk endpoint internal (bukan API publik).
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, JWTPayload } from "@/lib/auth";
import { fail } from "@/lib/apiUtils";

/**
 * Ambil payload JWT dari cookie auth_token.
 * Kembalikan null jika tidak ada / tidak valid.
 */
export function getAuthPayload(): JWTPayload | null {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

/** Response helper untuk 401 */
export function unauthorizedJson() {
  return NextResponse.json(fail("Silakan login terlebih dahulu.", 401), {
    status: 401,
  });
}
