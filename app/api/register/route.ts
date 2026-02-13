import { NextResponse } from "next/server";
import sql from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json({ error: "username required" }, { status: 400 });
  }

  const apiKey = crypto.randomBytes(24).toString("hex");

  try {
    await sql`
      INSERT INTO users (username, api_key)
      VALUES (${username}, ${apiKey})
    `;

    return NextResponse.json({
      username,
      api_key: apiKey
    });

  } catch (e) {
    return NextResponse.json({ error: "username already exists" }, { status: 400 });
  }
}
