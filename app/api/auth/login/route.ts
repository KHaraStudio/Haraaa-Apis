/**
 * POST /api/auth/login
 * Login pengguna; set cookie HttpOnly berisi JWT.
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword, signToken } from "@/lib/auth";
import { ok, fail } from "@/lib/apiUtils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, password } = body as Record<string, string>;

    if (!email || !password) {
      return NextResponse.json(fail("Email dan password wajib diisi."), { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) {
      return NextResponse.json(fail("Email atau password salah."), { status: 401 });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return NextResponse.json(fail("Email atau password salah."), { status: 401 });
    }

    // Buat JWT dan simpan ke cookie HttpOnly
    const token = signToken({ userId: user.id, email: user.email, username: user.username });

    const res = NextResponse.json(
      ok(
        { token, user: { id: user.id, username: user.username, email: user.email, apiKey: user.apiKey } },
        "Login berhasil."
      )
    );

    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 hari
      path: "/",
    });

    return res;
  } catch (e) {
    console.error("login error:", e);
    return NextResponse.json(fail("Terjadi kesalahan server.", 500), { status: 500 });
  }
}
