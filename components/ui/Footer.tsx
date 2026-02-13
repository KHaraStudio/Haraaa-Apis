import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50 mt-auto" style={{ background: "rgba(3,7,18,0.9)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#14b8a6,#0d9488)" }}>
                <span className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>H</span>
              </div>
              <span className="font-bold text-xl" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                <span className="text-white">Hara</span><span style={{ color: "#14b8a6" }}>API</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Platform REST API gratis untuk developer Indonesia. Bangun aplikasimu lebih cepat.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="badge-green">Gratis</span>
              <span className="badge-blue">100 req/jam</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              {[{href:"/",l:"Beranda"},{href:"/docs",l:"Dokumentasi"},{href:"/register",l:"Daftar Gratis"},{href:"/login",l:"Masuk"},{href:"/dashboard",l:"Dashboard"}]
                .map((x) => (
                  <li key={x.href}><Link href={x.href} className="text-slate-400 hover:text-teal-400 transition-colors">{x.l}</Link></li>
              ))}
            </ul>
          </div>

          {/* APIs */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">API Tersedia</h4>
            <ul className="space-y-2 text-sm">
              {["Quote Random","Base64 Encode/Decode","Hash MD5/SHA","Placeholder Image","IP Info"].map((a) => (
                <li key={a}>
                  <Link href="/docs" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>{a}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">© {new Date().getFullYear()} Hara API Service. Dibuat untuk developer Indonesia.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            <span className="text-slate-500 text-xs">Semua sistem normal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
