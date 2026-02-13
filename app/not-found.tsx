import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] px-4">
      <div className="text-center">
        <div className="text-8xl font-bold bg-clip-text text-transparent mb-4"
          style={{ backgroundImage: "linear-gradient(135deg,#2dd4bf,#14b8a6)", fontFamily: "'Space Grotesk',sans-serif" }}>
          404
        </div>
        <h1 className="text-2xl font-semibold text-white mb-3">Halaman Tidak Ditemukan</h1>
        <p className="text-slate-400 mb-8 max-w-sm mx-auto text-sm">Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary px-6 py-3 text-sm">← Kembali ke Beranda</Link>
          <Link href="/docs" className="btn-secondary px-6 py-3 text-sm">Lihat Dokumentasi</Link>
        </div>
      </div>
    </div>
  );
}
