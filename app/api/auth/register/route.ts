/**
 * POST /api/auth/register
 * Daftarkan pengguna baru dan buat API key otomatis.
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { generateApiKey, ok, fail, isEmail, isUsername, isPassOk as isPasswordOk } from "@/lib/apiUtils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { username, email, password } = body as Record<string, string>;

    // ── Validasi ──────────────────────────────────────────
    if (!username || !email || !password) {
      return NextResponse.json(fail("Username, email, dan password wajib diisi."), { status: 400 });
    }
    if (!isUsername(username)) {
      return NextResponse.json(
        fail("Username hanya boleh huruf, angka, underscore (3–20 karakter)."),
        { status: 400 }
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json(fail("Format email tidak valid."), { status: 400 });
    }
    if (!isPasswordOk(password)) {
      return NextResponse.json(fail("Password minimal 6 karakter."), { status: 400 });
    }

    // ── Cek duplikasi ─────────────────────────────────────
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] },
    });
    if (existing) {
      const field = existing.email === email.toLowerCase() ? "Email" : "Username";
      return NextResponse.json(fail(`${field} sudah terdaftar.`), { status: 409 });
    }

    // ── Buat user ─────────────────────────────────────────
    const hashed = await hashPassword(password);
    const apiKey = generateApiKey();

    const user = await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashed,
        apiKey,
      },
      select: { id: true, username: true, email: true, apiKey: true, createdAt: true },
    });

    return NextResponse.json(ok(user, "Registrasi berhasil! Selamat datang di Hara API."), {
      status: 201,
    });
  } catch (e) {
    console.error("register error:", e);
    return NextResponse.json(fail("Terjadi kesalahan server.", 500), { status: 500 });
  }
}
