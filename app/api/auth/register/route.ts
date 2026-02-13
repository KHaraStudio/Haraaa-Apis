/**
 * POST /api/auth/register
 * Daftarkan pengguna baru dan buat API key otomatis (Neon version).
 */

import { NextRequest, NextResponse } from "next/server";
import { sql, initDB } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import {
  generateApiKey,
  ok,
  fail,
  isEmail,
  isUsername,
  isPassOk as isPasswordOk,
} from "@/lib/apiUtils";

export async function POST(req: NextRequest) {
  try {
    // pastikan tabel ada
    await initDB();

    const body = await req.json().catch(() => ({}));
    const { username, email, password } = body as Record<string, string>;

    // ── Validasi ──────────────────────────────────────────
    if (!username || !email || !password) {
      return NextResponse.json(
        fail("Username, email, dan password wajib diisi."),
        { status: 400 }
      );
    }

    if (!isUsername(username)) {
      return NextResponse.json(
        fail("Username hanya boleh huruf, angka, underscore (3–20 karakter)."),
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(fail("Format email tidak valid."), {
        status: 400,
      });
    }

    if (!isPasswordOk(password)) {
      return NextResponse.json(fail("Password minimal 6 karakter."), {
        status: 400,
      });
    }

    // ── Cek duplikasi ─────────────────────────────────────
    const existing = await sql`
      SELECT id, email, username
      FROM users
      WHERE email = ${email.toLowerCase()}
         OR username = ${username.toLowerCase()}
      LIMIT 1
    `;

    if (existing.length > 0) {
      const user = existing[0];
      const field =
        user.email === email.toLowerCase() ? "Email" : "Username";

      return NextResponse.json(fail(`${field} sudah terdaftar.`), {
        status: 409,
      });
    }

    // ── Buat user ─────────────────────────────────────────
    const hashed = await hashPassword(password);
    const apiKey = generateApiKey();

    const created = await sql`
      INSERT INTO users (username, email, password, api_key)
      VALUES (
        ${username.toLowerCase()},
        ${email.toLowerCase()},
        ${hashed},
        ${apiKey}
      )
      RETURNING id, username, email, api_key, created_at
    `;

    const user = created[0];

    return NextResponse.json(
      ok(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          apiKey: user.api_key,
          createdAt: user.created_at,
        },
        "Registrasi berhasil! Selamat datang di Hara API."
      ),
      { status: 201 }
    );
  } catch (e) {
    console.error("register error:", e);
    return NextResponse.json(fail("Terjadi kesalahan server.", 500), {
      status: 500,
    });
  }
}	
