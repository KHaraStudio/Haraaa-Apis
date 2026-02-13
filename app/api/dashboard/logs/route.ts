/**
 * GET /api/dashboard/logs?page=1&limit=20
 * Ambil request log dengan pagination.
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ok } from "@/lib/apiUtils";
import { getAuthPayload, unauthorizedJson } from "@/middleware/withAuth";

export async function GET(req: NextRequest) {
  const payload = getAuthPayload();
  if (!payload) return unauthorizedJson();

  const { searchParams } = new URL(req.url);
  const page  = Math.max(1, parseInt(searchParams.get("page")  ?? "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "20")));
  const skip  = (page - 1) * limit;

  const [logs, total] = await Promise.all([
    prisma.apiLog.findMany({
      where: { userId: payload.userId },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: { id: true, endpoint: true, method: true, status: true, ip: true, userAgent: true, createdAt: true },
    }),
    prisma.apiLog.count({ where: { userId: payload.userId } }),
  ]);

  return NextResponse.json(
    ok({ logs, total, page, limit, totalPages: Math.ceil(total / limit) })
  );
}
