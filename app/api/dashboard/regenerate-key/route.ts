/**
 * POST /api/dashboard/regenerate-key
 * Generate ulang API key untuk user yang sedang login.
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ok } from "@/lib/apiUtils";
import { generateApiKey } from "@/lib/apiUtils";
import { getAuthPayload, unauthorizedJson } from "@/middleware/withAuth";

export async function POST() {
  const payload = getAuthPayload();
  if (!payload) return unauthorizedJson();

  const newKey = generateApiKey();

  const updated = await prisma.user.update({
    where: { id: payload.userId },
    data: { apiKey: newKey },
    select: { apiKey: true },
  });

  return NextResponse.json(
    ok({ apiKey: updated.apiKey }, "API key berhasil diperbarui. Key lama tidak berlaku lagi.")
  );
}
