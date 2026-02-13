import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { ok, fail } from "@/lib/apiUtils";

export async function GET(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey)
      return NextResponse.json(fail("API key tidak ditemukan"), { status: 401 });

    const user = await pool.query(
      `SELECT id,username,email,created_at FROM users WHERE api_key=$1`,
      [apiKey]
    );

    if (user.rows.length === 0)
      return NextResponse.json(fail("API key invalid"), { status: 401 });

    return NextResponse.json(ok(user.rows[0]));

  } catch (e) {
    return NextResponse.json(fail("Server error"), { status: 500 });
  }
}
