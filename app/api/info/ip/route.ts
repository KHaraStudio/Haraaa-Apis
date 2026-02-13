/**
 * GET /api/info/ip
 * Kembalikan IP address, user-agent, dan informasi request klien.
 */

import { NextRequest, NextResponse } from "next/server";
import { withApiAuth, ApiCtx } from "@/middleware/withApiAuth";
import { ok, getClientIp } from "@/lib/apiUtils";

async function handler(req: NextRequest, _ctx: ApiCtx): Promise<NextResponse> {
  const h  = req.headers;
  const ua = h.get("user-agent") ?? "Unknown";

  return NextResponse.json(
    ok({
      network: {
        ip: getClientIp(h),
        xForwardedFor: h.get("x-forwarded-for"),
        xRealIp: h.get("x-real-ip"),
        cfConnectingIp: h.get("cf-connecting-ip"),
      },
      client: {
        userAgent: ua,
        browser: parseBrowser(ua),
        os: parseOS(ua),
        deviceType: parseDevice(ua),
        acceptLanguage: h.get("accept-language"),
        referer: h.get("referer"),
      },
      request: {
        method: req.method,
        timestamp: new Date().toISOString(),
      },
    })
  );
}

function parseBrowser(ua: string): string {
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Google Chrome";
  if (ua.includes("Firefox")) return "Mozilla Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Apple Safari";
  if (ua.includes("Edg")) return "Microsoft Edge";
  if (ua.includes("curl")) return "cURL";
  if (ua.includes("axios") || ua.includes("node-fetch")) return "Node.js HTTP Client";
  if (ua.includes("Postman")) return "Postman";
  return "Unknown";
}

function parseOS(ua: string): string {
  if (ua.includes("Windows NT 10.0")) return "Windows 10/11";
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("iPhone")) return "iOS";
  if (ua.includes("iPad")) return "iPadOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("Mac OS X")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  return "Unknown";
}

function parseDevice(ua: string): string {
  if (ua.includes("Mobi") || ua.includes("iPhone") || ua.includes("Android")) return "Mobile";
  if (ua.includes("iPad") || ua.includes("Tablet")) return "Tablet";
  if (ua.includes("curl") || ua.includes("node") || ua.includes("Python") || ua.includes("axios")) return "API Client";
  return "Desktop";
}

export const GET = withApiAuth(handler, "/api/info/ip");
