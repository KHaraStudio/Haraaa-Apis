import { NextRequest } from "next/server";

/**
 * GET /api/image/placeholder
 * Menghasilkan gambar placeholder PNG
 */

export async function GET(req: NextRequest) {

  // SVG placeholder (lebih ringan daripada canvas di serverless)
  const svg = `
  <svg width="600" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#0f172a"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      fill="#38bdf8" font-size="32" font-family="Arial, Helvetica, sans-serif">
      Hara API
    </text>
    <text x="50%" y="70%" dominant-baseline="middle" text-anchor="middle"
      fill="#94a3b8" font-size="16" font-family="Arial, Helvetica, sans-serif">
      Placeholder Image
    </text>
  </svg>
  `;

  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable"
    },
  });
}
