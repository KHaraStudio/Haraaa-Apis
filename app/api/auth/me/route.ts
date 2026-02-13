/**
 * GET /api/auth/me
 * Kembalikan data user yang sedang login (dari cookie).
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ok, fail } from "@/lib/apiUtils";
import { getAuthPayload, unauthorizedJson } from "@/middleware/withAuth";

export async function GET() {
  const payload = getAuthPayload();
  if (!payload) return unauthorizedJson();

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true, username: true, email: true, apiKey: true, createdAt: true,
      _count: { select: { logs: true } },
    },
  });

  if (!user) return NextResponse.json(fail("User tidak ditemukan.", 404), { status: 404 });

  return NextResponse.json(
    ok({ ...user, totalRequests: user._count.logs })
  );
}
