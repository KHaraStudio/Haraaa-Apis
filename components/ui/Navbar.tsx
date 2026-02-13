"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/docs", label: "Dokumentasi" },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 h-16 flex items-center"
      style={{ background: "rgba(3,7,18,0.85)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(51,65,85,0.4)" }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#14b8a6,#0d9488)" }}>
            <span className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>H</span>
          </div>
          <span className="font-bold text-lg" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
            <span className="text-white">Hara</span><span style={{ color: "#14b8a6" }}>API</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${path === n.href ? "text-teal-400 bg-teal-400/10" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}>
              {n.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-slate-400 hover:text-white text-sm transition-colors px-3 py-2">Masuk</Link>
          <Link href="/register" className="btn-primary !py-2 !px-4 !text-sm">Daftar Gratis</Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-md text-slate-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-16 inset-x-0 py-4 px-4 space-y-1 border-t border-slate-800"
          style={{ background: "rgba(3,7,18,0.97)", backdropFilter: "blur(14px)" }}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              className="block px-4 py-2.5 rounded-md text-sm text-slate-400 hover:text-slate-200">
              {n.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/login" onClick={() => setOpen(false)} className="btn-ghost w-full text-center">Masuk</Link>
            <Link href="/register" onClick={() => setOpen(false)} className="btn-primary w-full text-center">Daftar Gratis</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
