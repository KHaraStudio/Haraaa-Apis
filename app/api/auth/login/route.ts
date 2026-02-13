import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { comparePassword } from "@/lib/auth";
import { ok, fail } from "@/lib/apiUtils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, password } = body as Record<string, string>;

    if (!email || !password)
      return NextResponse.json(fail("Email dan password wajib diisi"), { status: 400 });

    const user = await pool.query(
      `SELECT * FROM users WHERE email=$1`,
      [email.toLowerCase()]
    );

    if (user.rows.length === 0)
      return NextResponse.json(fail("User tidak ditemukan"), { status: 404 });

    const valid = await comparePassword(password, user.rows[0].password);

    if (!valid)
      return NextResponse.json(fail("Password salah"), { status: 401 });

    return NextResponse.json(
      ok({
        id: user.rows[0].id,
        username: user.rows[0].username,
        email: user.rows[0].email,
        apiKey: user.rows[0].api_key
      }, "Login berhasil")
    );

  } catch (e) {
    console.error(e);
    return NextResponse.json(fail("Server error"), { status: 500 });
  }
}
