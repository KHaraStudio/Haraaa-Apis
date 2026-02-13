/**
 * GET /api/quote/random
 * Kembalikan kutipan motivasi acak.
 * Header: Authorization: Bearer API_KEY
 */

import { NextRequest, NextResponse } from "next/server";
import { withApiAuth, ApiCtx } from "@/middleware/withApiAuth";
import { ok } from "@/lib/apiUtils";

const QUOTES = [
  { id: 1,  text: "Kesuksesan bukan kunci kebahagiaan. Kebahagiaanlah kunci kesuksesan.", author: "Albert Schweitzer", category: "Motivasi" },
  { id: 2,  text: "Kamu tidak harus hebat untuk memulai, tapi harus memulai untuk menjadi hebat.", author: "Zig Ziglar", category: "Motivasi" },
  { id: 3,  text: "Mimpi bukan yang kamu lihat saat tidur, mimpi adalah yang tidak membiarkanmu tidur.", author: "A.P.J. Abdul Kalam", category: "Impian" },
  { id: 4,  text: "Seribu mil perjalanan dimulai dengan satu langkah.", author: "Lao Tzu", category: "Permulaan" },
  { id: 5,  text: "Waktu terbaik menanam pohon adalah 20 tahun lalu. Waktu terbaik kedua adalah sekarang.", author: "Pepatah Cina", category: "Tindakan" },
  { id: 6,  text: "Satu-satunya cara melakukan pekerjaan luar biasa adalah mencintai apa yang kamu lakukan.", author: "Steve Jobs", category: "Passion" },
  { id: 7,  text: "Hidup adalah 10% apa yang terjadi dan 90% bagaimana kamu bereaksi.", author: "Charles R. Swindoll", category: "Kehidupan" },
  { id: 8,  text: "Percayalah pada dirimu dan semua yang kamu miliki.", author: "Christian D. Larson", category: "Kepercayaan" },
  { id: 9,  text: "Orang sukses adalah yang bangkit setiap kali jatuh.", author: "Vince Lombardi", category: "Ketahanan" },
  { id: 10, text: "Jangan menunggu inspirasi. Mulailah dan inspirasi akan mengikuti.", author: "Jack London", category: "Tindakan" },
  { id: 11, text: "Keberhasilan datang kepada mereka yang terlalu sibuk untuk mencarinya.", author: "Henry David Thoreau", category: "Kerja Keras" },
  { id: 12, text: "Dalam tiga kata: hidup terus berjalan.", author: "Robert Frost", category: "Kehidupan" },
  { id: 13, text: "Jadilah perubahan yang ingin kamu lihat di dunia.", author: "Mahatma Gandhi", category: "Perubahan" },
  { id: 14, text: "Pendidikan adalah senjata paling ampuh untuk mengubah dunia.", author: "Nelson Mandela", category: "Pendidikan" },
  { id: 15, text: "Kreativitas adalah kecerdasan yang sedang bersenang-senang.", author: "Albert Einstein", category: "Kreativitas" },
];

async function handler(_req: NextRequest, _ctx: ApiCtx): Promise<NextResponse> {
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  return NextResponse.json(ok({ quote, total: QUOTES.length }));
}

export const GET = withApiAuth(handler, "/api/quote/random");
