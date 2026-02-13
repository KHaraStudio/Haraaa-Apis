import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { generateApiKey, ok, fail, isEmail, isUsername, isPassOk as isPasswordOk } from "@/lib/apiUtils";
import { runMigration } from "@/lib/migrate";

export async function POST(req: NextRequest) {
  try {
    await runMigration();

    const body = await req.json().catch(() => ({}));
    const { username, email, password } = body as Record<string, string>;

    if (!username || !email || !password) {
      return NextResponse.json(fail("Username, email, dan password wajib diisi."), { status: 400 });
    }

    if (!isUsername(username))
      return NextResponse.json(fail("Username tidak valid"), { status: 400 });

    if (!isEmail(email))
      return NextResponse.json(fail("Email tidak valid"), { status: 400 });

    if (!isPasswordOk(password))
      return NextResponse.json(fail("Password minimal 6 karakter"), { status: 400 });

    // cek user
    const check = await pool.query(
      `SELECT * FROM users WHERE email=$1 OR username=$2`,
      [email.toLowerCase(), username.toLowerCase()]
    );

    if (check.rows.length > 0)
      return NextResponse.json(fail("Email atau username sudah digunakan"), { status: 409 });

    const hashed = await hashPassword(password);
    const apiKey = generateApiKey();

    const result = await pool.query(
      `INSERT INTO users (username,email,password,api_key)
       VALUES ($1,$2,$3,$4)
       RETURNING id,username,email,api_key,created_at`,
      [username.toLowerCase(), email.toLowerCase(), hashed, apiKey]
    );

    return NextResponse.json(ok(result.rows[0], "Registrasi berhasil!"), { status: 201 });

  } catch (e) {
    console.error(e);
    return NextResponse.json(fail("Server error"), { status: 500 });
  }
}
