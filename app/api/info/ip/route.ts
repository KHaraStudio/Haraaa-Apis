import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/info/ip
 * Mengambil IP address client
 */
export async function GET(req: NextRequest) {

  // Vercel menyediakan IP dari header ini
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "0.0.0.0";

  return NextResponse.json({
    success: true,
    ip,
    provider: "Vercel Edge",
  });
}
