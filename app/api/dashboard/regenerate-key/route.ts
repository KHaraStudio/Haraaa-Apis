import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { generateApiKey, ok, fail } from "@/lib/apiUtils";

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey)
      return NextResponse.json(fail("Unauthorized"), { status: 401 });

    const newKey = generateApiKey();

    await pool.query(
      `UPDATE users SET api_key=$1 WHERE api_key=$2`,
      [newKey, apiKey]
    );

    return NextResponse.json(ok({ apiKey: newKey }, "API key diperbarui"));

  } catch {
    return NextResponse.json(fail("Server error"), { status: 500 });
  }
}
