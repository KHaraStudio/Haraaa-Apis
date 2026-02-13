import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

/**

* Context yang diberikan ke route setelah auth sukses
  */
  export type ApiCtx = {
  userId: string;
  username: string;
  apiKey: string;
  };

/**

* Wrapper proteksi API Route (BUKAN NextJS middleware.ts)
  */
  export async function withApiAuth(
  req: NextRequest,
  handler: (req: NextRequest, ctx: ApiCtx) => Promise<NextResponse>
  ) {
  try {
  const apiKey = req.headers.get("x-api-key");
  
  if (!apiKey) {
  return NextResponse.json(
  { success: false, message: "API key diperlukan." },
  { status: 401 }
  );
  }
  
  // cek database Neon
  const result = await pool.query(
  "SELECT id, username, api_key FROM users WHERE api_key=$1 LIMIT 1",
  [apiKey]
  );
  
  if (result.rowCount === 0) {
  return NextResponse.json(
  { success: false, message: "API key tidak valid." },
  { status: 403 }
  );
  }
  
  const user = result.rows[0];
  
  // jalankan handler route
  return handler(req, {
  userId: String(user.id),
  username: user.username,
  apiKey: user.api_key,
  });

} catch (err) {
console.error("withApiAuth error:", err);
return NextResponse.json(
{ success: false, message: "Terjadi kesalahan server." },
{ status: 500 }
);
}
}
