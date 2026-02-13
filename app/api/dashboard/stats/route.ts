/**
 * GET /api/dashboard/stats
 * Statistik penggunaan untuk dashboard (hanya user yang login).
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ok, fail } from "@/lib/apiUtils";
import { getAuthPayload, unauthorizedJson } from "@/middleware/withAuth";

export async function GET() {
  const payload = getAuthPayload();
  if (!payload) return unauthorizedJson();

  const userId = payload.userId;

  // Ambil batas 7 hari lalu
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [totalLogs, recentLogs, byEndpoint, allRecent] = await Promise.all([
    // Total request keseluruhan
    prisma.apiLog.count({ where: { userId } }),

    // 10 log terbaru
    prisma.apiLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { id: true, endpoint: true, method: true, status: true, ip: true, createdAt: true },
    }),

    // Top 5 endpoint
    prisma.apiLog.groupBy({
      by: ["endpoint"],
      where: { userId },
      _count: { endpoint: true },
      orderBy: { _count: { endpoint: "desc" } },
      take: 5,
    }),

    // Semua log 7 hari terakhir untuk chart harian
    prisma.apiLog.findMany({
      where: { userId, createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    }),
  ]);

  // Bangun data chart harian (7 hari)
  const dailyMap: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dailyMap[d.toISOString().split("T")[0]] = 0;
  }
  allRecent.forEach(({ createdAt }) => {
    const key = createdAt.toISOString().split("T")[0];
    if (key in dailyMap) dailyMap[key]++;
  });

  return NextResponse.json(
    ok({
      totalRequests: totalLogs,
      recentLogs,
      topEndpoints: byEndpoint.map((e) => ({ endpoint: e.endpoint, count: e._count.endpoint })),
      dailyUsage: Object.entries(dailyMap).map(([date, count]) => ({ date, count })),
    })
  );
}
