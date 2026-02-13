import { NextResponse } from "next/server";

/**
 * GET /api/quote/random
 * Mengambil quote random
 */

const quotes = [
  "The best way to get started is to quit talking and begin doing.",
  "Stay hungry, stay foolish.",
  "Dream big. Start small. Act now.",
  "Do something today that your future self will thank you for.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Discipline beats motivation.",
  "Small progress is still progress."
];

export async function GET() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return NextResponse.json({
    success: true,
    quote,
    author: "Hara API"
  });
}
