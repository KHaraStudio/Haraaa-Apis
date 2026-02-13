/**
 * GET /api/image/placeholder?text=Hello&w=400&h=200&bg=14b8a6&color=ffffff
 * Generate placeholder image sebagai SVG inline + URL eksternal.
 */

import { NextRequest, NextResponse } from "next/server";
import { withApiAuth, ApiCtx } from "@/middleware/withApiAuth";
import { ok, fail } from "@/lib/apiUtils";

async function handler(req: NextRequest, _ctx: ApiCtx): Promise<NextResponse> {
  const sp    = new URL(req.url).searchParams;
  const text  = (sp.get("text") || "Placeholder").slice(0, 80);
  const w     = Math.min(2000, Math.max(1, parseInt(sp.get("w") || sp.get("width") || "400")));
  const h     = Math.min(2000, Math.max(1, parseInt(sp.get("h") || sp.get("height") || "200")));
  const bg    = (sp.get("bg") || "14b8a6").replace("#", "");
  const color = (sp.get("color") || "ffffff").replace("#", "");

  if (isNaN(w) || isNaN(h)) {
    return NextResponse.json(fail("Parameter w dan h harus berupa angka."), { status: 400 });
  }

  // Validasi warna hex
  if (!/^[0-9a-fA-F]{3,6}$/.test(bg) || !/^[0-9a-fA-F]{3,6}$/.test(color)) {
    return NextResponse.json(fail("Warna harus dalam format hex tanpa # (mis. ff0000)."), { status: 400 });
  }

  const fontSize = Math.min(48, Math.max(12, Math.floor(Math.min(w, h) / 7)));

  // SVG inline yang ringan
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="#${bg}"/><text x="50%" y="45%" font-family="Arial,sans-serif" font-size="${fontSize}" fill="#${color}" text-anchor="middle" dominant-baseline="middle">${text}</text><text x="50%" y="62%" font-family="Arial,sans-serif" font-size="${Math.floor(fontSize * 0.55)}" fill="#${color}" opacity="0.6" text-anchor="middle">${w}×${h}</text></svg>`;

  const svgDataUri  = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  const externalUrl = `https://placehold.co/${w}x${h}/${bg}/${color}?text=${encodeURIComponent(text)}`;

  return NextResponse.json(
    ok({ url: externalUrl, svgDataUri, svg, params: { text, width: w, height: h, bg: `#${bg}`, color: `#${color}` } })
  );
}

export const GET = withApiAuth(handler, "/api/image/placeholder");
