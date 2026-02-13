import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

/**
 * Middleware untuk validasi API Key
 * Header: x-api-key
 */

export async function withApiAuth(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "API key dibutuhkan" },
        { status: 401 }
      );
    }

    const result = await pool.query(
      `SELECT id, username FROM users WHERE api_key=$1`,
      [apiKey]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "API key tidak valid" },
        { status: 401 }
      );
    }

    // inject user ke request
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", result.rows[0].id.toString());
    requestHeaders.set("x-username", result.rows[0].username);

    return NextResponse.next({
      request: { headers: requestHeaders }
    });

  } catch (err) {
    console.error("Auth middleware error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
