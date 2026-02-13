import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL!);

// auto create tables
let initialized = false;

export async function initDB() {
  if (initialized) return;
  initialized = true;

  // extension buat UUID
  await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`;

  // users table
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      api_key TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  // api logs
  await sql`
    CREATE TABLE IF NOT EXISTS api_logs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      endpoint TEXT,
      method TEXT,
      ip TEXT,
      user_agent TEXT,
      status INTEGER,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
}
