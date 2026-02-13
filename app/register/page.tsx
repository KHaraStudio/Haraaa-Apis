"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm]     = useState({ username:"", email:"", password:"" });
  const [error, setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
    try {
      const res  = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.status) {
        setError(data.message || "Registrasi gagal.");
      } else {
        setSuccess("Akun berhasil dibuat! Mengalihkan ke halaman login...");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch {
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#030712] bg-dots flex flex-col items-center justify-center px-4 py-16">
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)" }} />

      <Link href="/" className="flex items-center gap-2.5 mb-10 relative">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:"linear-gradient(135deg,#14b8a6,#0d9488)" }}>
          <span className="text-white font-bold display">H</span>
        </div>
        <span className="display font-bold text-xl">
          <span className="text-white">Hara</span><span style={{ color:"#14b8a6" }}>API</span>
        </span>
      </Link>

      <div className="glass rounded-2xl p-8 w-full max-w-md relative animate-up">
        <h1 className="display text-2xl font-bold text-white mb-1">Buat Akun Gratis</h1>
        <p className="text-slate-400 text-sm mb-7">Daftar dan dapatkan API key instan. Tidak perlu kartu kredit.</p>

        {error && (
          <div className="mb-5 px-4 py-3 rounded-lg text-sm text-red-400 flex items-center gap-2"
            style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)" }}>
            ⚠ {error}
          </div>
        )}
        {success && (
          <div className="mb-5 px-4 py-3 rounded-lg text-sm text-teal-400 flex items-center gap-2"
            style={{ background:"rgba(20,184,166,0.08)", border:"1px solid rgba(20,184,166,0.2)" }}>
            ✓ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-400 text-xs mb-1.5 uppercase tracking-wider">Username</label>
            <input className="input" type="text" placeholder="developer123" required
              value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <p className="text-slate-600 text-xs mt-1">3–20 karakter, huruf/angka/underscore</p>
          </div>
          <div>
            <label className="block text-slate-400 text-xs mb-1.5 uppercase tracking-wider">Email</label>
            <input className="input" type="email" placeholder="developer@email.com" required
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="block text-slate-400 text-xs mb-1.5 uppercase tracking-wider">Password</label>
            <input className="input" type="password" placeholder="Min. 6 karakter" required minLength={6}
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <button type="submit" disabled={loading}
            className="btn-primary w-full py-3 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading
              ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Memproses...</span>
              : "Daftar Gratis →"
            }
          </button>
        </form>

        {/* API Key preview info */}
        <div className="mt-6 p-3 rounded-lg" style={{ background:"rgba(20,184,166,0.05)", border:"1px solid rgba(20,184,166,0.15)" }}>
          <p className="text-xs text-slate-500">
            <span className="text-teal-400">✓</span> API key akan digenerate otomatis setelah registrasi.
            Format: <code className="text-teal-400 text-xs">hara_xxxxxxxx-xxxxxxxx-xxxxxxxx</code>
          </p>
        </div>

        <p className="mt-5 text-center text-slate-500 text-sm">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-teal-400 hover:text-teal-300 transition-colors">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}
