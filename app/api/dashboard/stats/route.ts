import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { ok } from "@/lib/apiUtils";

export async function GET() {
  const total = await pool.query(`SELECT COUNT(*) FROM users`);

  return NextResponse.json(ok({
    totalUsers: Number(total.rows[0].count)
  }));
}
