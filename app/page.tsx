import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const FEATURES = [
  { icon: "🔑", title: "API Key Gratis",     desc: "Daftar dan dapatkan API key unik secara instan. Tidak perlu kartu kredit." },
  { icon: "⚡", title: "Respon Cepat",        desc: "Endpoint dioptimalkan untuk latensi rendah dan throughput tinggi." },
  { icon: "📊", title: "Monitor Penggunaan", desc: "Dashboard lengkap untuk memantau request, log, dan statistik harian." },
  { icon: "🛡️", title: "Rate Limit Wajar",   desc: "100 request per jam per key. Lebih dari cukup untuk development." },
  { icon: "📖", title: "Docs Lengkap",       desc: "Setiap endpoint dilengkapi contoh request, response, dan fitur Try It." },
  { icon: "🔧", title: "Tools Developer",    desc: "Base64, Hash, Placeholder Image, IP Info, dan terus bertambah." },
];

const APIS = [
  { path: "/api/quote/random",        desc: "Kutipan motivasi acak" },
  { path: "/api/tools/base64/encode", desc: "Encode teks ke Base64" },
  { path: "/api/tools/base64/decode", desc: "Decode Base64 ke teks" },
  { path: "/api/tools/hash/md5",      desc: "Hash MD5 / SHA1 / SHA256" },
  { path: "/api/image/placeholder",   desc: "Generate placeholder image" },
  { path: "/api/info/ip",             desc: "Info IP & User-Agent klien" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#030712] bg-dots">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.1) 0%, transparent 70%)" }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
            style={{ background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.25)", color: "#2dd4bf" }}>
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Platform REST API Gratis · Developer Indonesia
          </div>

          <h1 className="display text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
            <span className="text-white">API</span>{" "}
            <span className="gradient-text text-glow">Siap Pakai</span>
            <br className="hidden sm:block" />
            <span className="text-white"> untuk Proyekmu</span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Daftar gratis, dapatkan API key, dan langsung gunakan berbagai endpoint REST yang handal.
            Dokumentasi lengkap dan tanpa biaya apapun.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="btn-primary text-base px-8 py-3 glow-teal">Mulai Gratis →</Link>
            <Link href="/docs"     className="btn-ghost   text-base px-8 py-3">Lihat Dokumentasi</Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-sm mx-auto">
            {[["6+","API Endpoints"],["100","Req/Jam"],["0","Biaya"]].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="display text-3xl font-bold gradient-text">{n}</div>
                <div className="text-slate-500 text-xs mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CODE PREVIEW */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-700/50"
              style={{ background: "rgba(5,13,26,0.8)" }}>
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-slate-500 text-xs font-mono">GET /api/quote/random</span>
            </div>
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-700/30">
              <div className="p-5">
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">cURL Request</p>
                <pre className="code-block text-xs">{`curl -X GET \\
  "http://localhost:3000/api/quote/random" \\
  -H "Authorization: Bearer hara_abc-def-ghi"`}</pre>
              </div>
              <div className="p-5">
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">JSON Response</p>
                <pre className="code-block text-xs">
<code><span className="tok-punc">{"{"}</span>{"\n"}
<span className="tok-str">  "status"</span><span className="tok-punc">: </span><span className="tok-bool">true</span><span className="tok-punc">,</span>{"\n"}
<span className="tok-str">  "creator"</span><span className="tok-punc">: </span><span className="tok-str">"Hara API"</span><span className="tok-punc">,</span>{"\n"}
<span className="tok-str">  "data"</span><span className="tok-punc">: {"{"}</span>{"\n"}
<span className="tok-str">    "quote"</span><span className="tok-punc">: {"{"}</span>{"\n"}
<span className="tok-str">      "text"</span><span className="tok-punc">: </span><span className="tok-str">"Jadilah perubahan..."</span><span className="tok-punc">,</span>{"\n"}
<span className="tok-str">      "author"</span><span className="tok-punc">: </span><span className="tok-str">"Mahatma Gandhi"</span>{"\n"}
<span className="tok-punc">    {"}"}</span>{"\n"}
<span className="tok-punc">  {"}"}</span>{"\n"}
<span className="tok-punc">{"}"}</span></code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="display text-4xl font-bold text-white mb-3">Kenapa Hara API?</h2>
            <p className="text-slate-400 max-w-lg mx-auto">Didesain khusus untuk mempermudah developer dalam prototyping dan pengembangan.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass rounded-xl p-6 hover:border-teal-500/30 transition-colors group cursor-default">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200 inline-block">{f.icon}</div>
                <h3 className="display font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API LIST */}
      <section className="py-20 px-4 sm:px-6 bg-grid">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="display text-4xl font-bold text-white mb-3">API yang Tersedia</h2>
            <p className="text-slate-400 text-sm">Semua endpoint membutuhkan{" "}
              <code className="text-teal-400 bg-teal-400/10 px-1.5 py-0.5 rounded text-xs">Authorization: Bearer API_KEY</code>
            </p>
          </div>
          <div className="space-y-2.5">
            {APIS.map((a) => (
              <div key={a.path} className="glass-sm rounded-xl px-5 py-3.5 flex flex-col sm:flex-row sm:items-center gap-2 hover:border-teal-500/25 transition-colors">
                <span className="px-2 py-0.5 rounded text-xs font-bold font-mono flex-shrink-0"
                  style={{ background:"rgba(20,184,166,0.12)", color:"#2dd4bf" }}>GET</span>
                <code className="text-sm text-slate-200 flex-1">{a.path}</code>
                <span className="text-slate-500 text-xs">{a.desc}</span>
                <Link href="/docs" className="text-teal-400 text-xs hover:text-teal-300 transition-colors flex-shrink-0">Docs →</Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/docs" className="btn-ghost">Lihat Dokumentasi Lengkap</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse at center, rgba(20,184,166,0.15) 0%, transparent 70%)" }} />
            <div className="relative">
              <h2 className="display text-4xl font-bold text-white mb-4">Siap Mulai?</h2>
              <p className="text-slate-400 mb-8 text-lg">Buat akun dan dapatkan API key gratis dalam hitungan detik.</p>
              <Link href="/register" className="btn-primary text-base px-10 py-3.5 glow-teal">Buat Akun Gratis →</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
