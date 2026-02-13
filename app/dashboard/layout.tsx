"use client";
/**
 * app/dashboard/layout.tsx
 * Layout dashboard dengan sidebar navigasi.
 * Mengecek autentikasi di client-side dan redirect jika belum login.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface User {
  id: string; username: string; email: string; apiKey: string; createdAt: string; totalRequests: number;
}

const NAV_ITEMS = [
  { href: "/dashboard",            icon: "⊞", label: "Overview" },
  { href: "/dashboard/api-keys",   icon: "🔑", label: "API Keys" },
  { href: "/dashboard/usage",      icon: "📊", label: "Penggunaan" },
  { href: "/dashboard/account",    icon: "👤", label: "Akun" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [user, setUser]         = useState<User | null>(null);
  const [loading, setLoading]   = useState(true);
  const [mobileOpen, setMobile] = useState(false);

  // Cek autentikasi
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.status) { router.push("/login"); return; }
        setUser(d.data);
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin w-8 h-8 text-teal-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <p className="text-slate-500 text-sm">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  const Sidebar = () => (
    <aside className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800/60">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:"linear-gradient(135deg,#14b8a6,#0d9488)" }}>
            <span className="text-white font-bold text-sm display">H</span>
          </div>
          <span className="display font-bold text-base">
            <span className="text-white">Hara</span><span style={{ color:"#14b8a6" }}>API</span>
          </span>
        </Link>
      </div>

      {/* User info */}
      {user && (
        <div className="px-4 py-4 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background:"linear-gradient(135deg,#14b8a6,#0d9488)" }}>
              {user.username[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.username}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href}
            onClick={() => setMobile(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === item.href
                ? "text-teal-400 bg-teal-400/10 border border-teal-400/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}>
            <span className="text-base">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-slate-800/60 space-y-1">
        <Link href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
          <span>🏠</span> Beranda
        </Link>
        <Link href="/docs"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
          <span>📖</span> Dokumentasi
        </Link>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors">
          <span>⎋</span> Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex bg-[#030712]">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-60 flex-shrink-0 border-r border-slate-800/60"
        style={{ background:"rgba(10,15,30,0.8)", backdropFilter:"blur(12px)" }}>
        <Sidebar />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobile(false)} />
          <div className="relative z-50 w-64 flex flex-col border-r border-slate-800"
            style={{ background:"rgba(10,15,30,0.98)", backdropFilter:"blur(12px)" }}>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="md:hidden flex items-center gap-3 px-4 h-14 border-b border-slate-800/60"
          style={{ background:"rgba(3,7,18,0.9)" }}>
          <button onClick={() => setMobile(true)} className="p-1.5 rounded-md text-slate-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="display font-bold text-base">
            <span className="text-white">Hara</span><span style={{ color:"#14b8a6" }}>API</span>
          </span>
          <span className="ml-auto text-slate-400 text-xs">{user?.username}</span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
