"use client";
import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

interface Endpoint {
  id: string;
  method: string;
  path: string;
  title: string;
  description: string;
  params: Array<{ name: string; type: string; required: boolean; desc: string }>;
  example: string;
  response: string;
}

const ENDPOINTS: Endpoint[] = [
  {
    id: "quote-random",
    method: "GET",
    path: "/api/quote/random",
    title: "Quote Acak",
    description: "Mengambil satu kutipan motivasi secara acak dari koleksi 15+ kutipan inspiratif.",
    params: [],
    example: `curl -X GET "http://localhost:3000/api/quote/random" \\
  -H "Authorization: Bearer hara_xxxxxxxx-xxxxxxxx-xxxxxxxx"`,
    response: `{
  "status": true,
  "creator": "Hara API",
  "message": "Berhasil",
  "data": {
    "quote": {
      "id": 3,
      "text": "Mimpi bukan apa yang kamu lihat dalam tidur...",
      "author": "A.P.J. Abdul Kalam",
      "category": "Impian"
    },
    "totalQuotes": 15
  }
}`,
  },
  {
    id: "base64-encode",
    method: "GET",
    path: "/api/tools/base64/encode",
    title: "Base64 Encode",
    description: "Mengubah teks biasa menjadi format Base64.",
    params: [{ name: "text", type: "string", required: true, desc: "Teks yang akan diencoding" }],
    example: `curl -X GET "http://localhost:3000/api/tools/base64/encode?text=HelloWorld" \\
  -H "Authorization: Bearer hara_xxxxxxxx-xxxxxxxx-xxxxxxxx"`,
    response: `{
  "status": true,
  "creator": "Hara API",
  "data": {
    "original": "HelloWorld",
    "encoded": "SGVsbG9Xb3JsZA==",
    "length": { "original": 10, "encoded": 16 }
  }
}`,
  },
  {
    id: "base64-decode",
    method: "GET",
    path: "/api/tools/base64/decode",
    title: "Base64 Decode",
    description: "Mengubah string Base64 kembali menjadi teks asli.",
    params: [{ name: "text", type: "string", required: true, desc: "String Base64 yang akan didecoding" }],
    example: `curl -X GET "http://localhost:3000/api/tools/base64/decode?text=SGVsbG9Xb3JsZA==" \\
  -H "Authorization: Bearer hara_xxxxxxxx-xxxxxxxx-xxxxxxxx"`,
    response: `{
  "status": true,
  "creator": "Hara API",
  "data": {
    "original": "SGVsbG9Xb3JsZA==",
    "decoded": "HelloWorld",
    "length": { "encoded": 16, "decoded": 10 }
  }
}`,
  },
  {
    id: "hash-md5",
    method: "GET",
    path: "/api/tools/hash/md5",
    title: "Hash MD5 / SHA",
    description: "Menghasilkan hash MD5, SHA1, dan SHA256 dari teks input.",
    params: [{ name: "text", type: "string", required: true, desc: "Teks yang akan di-hash" }],
    example: `curl -X GET "http://localhost:3000/api/tools/hash/md5?text=HelloWorld" \\
  -H "Authorization: Bearer hara_xxxxxxxx-xxxxxxxx-xxxxxxxx"`,
    response: `{
  "status": true,
  "creator": "Hara API",
  "data": {
    "input": "HelloWorld",
    "hashes": {
      "md5": "e10adc3949ba59abbe56e057f20f883e",
      "sha1": "0a4d55a8d778e5022fab701977c5d840bbc486d0",
      "sha256": "872e4e50ce9990d8b041330c47c9ddd11bec6b503ae9386a99da8584e9bb12c4"
    }
  }
}`,
  },
  {
    id: "image-placeholder",
    method: "GET",
    path: "/api/image/placeholder",
    title: "Placeholder Image",
    description: "Generate URL dan SVG placeholder image dengan ukuran dan warna kustom.",
    params: [
      { name: "text", type: "string", required: false, desc: "Teks pada gambar (default: 'Placeholder')" },
      { name: "width", type: "number", required: false, desc: "Lebar gambar px (default: 400, max: 2000)" },
      { name: "height", type: "number", required: false, desc: "Tinggi gambar px (default: 200, max: 2000)" },
      { name: "bg", type: "string", required: false, desc: "Warna background hex (default: 14b8a6)" },
      { name: "color", type: "string", required: false, desc: "Warna teks hex (default: ffffff)" },
    ],
    example: `curl -X GET "http://localhost:3000/api/image/placeholder?text=Hello&width=400&height=200&bg=14b8a6&color=ffffff" \\
  -H "Authorization: Bearer hara_xxxxxxxx-xxxxxxxx-xxxxxxxx"`,
    response: `{
  "status": true,
  "creator": "Hara API",
  "data": {
    "url": "https://placehold.co/400x200/14b8a6/ffffff?text=Hello",
    "svgDataUri": "data:image/svg+xml;base64,...",
    "params": { "text": "Hello", "width": 400, "height": 200 }
  }
}`,
  },
  {
    id: "info-ip",
    method: "GET",
    path: "/api/info/ip",
    title: "Info IP Address",
    description: "Mengembalikan informasi IP address, User-Agent, dan detail device pengguna.",
    params: [],
    example: `curl -X GET "http://localhost:3000/api/info/ip" \\
  -H "Authorization: Bearer hara_xxxxxxxx-xxxxxxxx-xxxxxxxx"`,
    response: `{
  "status": true,
  "creator": "Hara API",
  "data": {
    "network": { "ip": "114.79.12.34", "forwardedFor": null },
    "client": {
      "userAgent": "Mozilla/5.0 ...",
      "browser": "Google Chrome",
      "os": "Windows 10/11",
      "deviceType": "Desktop"
    },
    "request": { "method": "GET", "timestamp": "2024-01-15T10:30:00.000Z" }
  }
}`,
  },
];

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = { GET: "badge-green", POST: "badge-blue", DELETE: "badge-red", PUT: "badge-yellow" };
  return <span className={colors[method] || "badge-blue"}>{method}</span>;
}

export default function DocsPage() {
  const [active, setActive] = useState("quote-random");
  const [tryInput, setTryInput] = useState<Record<string, string>>({});
  const [tryApiKey, setTryApiKey] = useState("");
  const [tryResult, setTryResult] = useState<Record<string, string>>({});
  const [tryLoading, setTryLoading] = useState<Record<string, boolean>>({});

  const endpoint = ENDPOINTS.find(e => e.id === active)!;

  async function handleTry(ep: Endpoint) {
    if (!tryApiKey) { alert("Masukkan API Key kamu terlebih dahulu"); return; }
    setTryLoading(p => ({ ...p, [ep.id]: true }));
    try {
      let url = ep.path;
      const params = new URLSearchParams();
      ep.params.forEach(p => { if (tryInput[`${ep.id}_${p.name}`]) params.set(p.name, tryInput[`${ep.id}_${p.name}`]); });
      if (params.toString()) url += "?" + params.toString();
      const res = await fetch(url, { headers: { Authorization: `Bearer ${tryApiKey}` } });
      const data = await res.json();
      setTryResult(prev => ({ ...prev, [ep.id]: JSON.stringify(data, null, 2) }));
    } catch (e: any) {
      setTryResult(prev => ({ ...prev, [ep.id]: `Error: ${e.message}` }));
    } finally {
      setTryLoading(p => ({ ...p, [ep.id]: false }));
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#030712]">
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-24 pb-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Dokumentasi API</h1>
          <p className="text-slate-400">Panduan lengkap untuk semua endpoint Hara API Service.</p>
          {/* Auth info */}
          <div className="mt-5 p-4 rounded-xl border border-teal-500/20 text-sm" style={{ background: "rgba(20,184,166,0.05)" }}>
            <p className="text-teal-400 font-medium mb-1">🔑 Autentikasi</p>
            <p className="text-slate-400 text-xs">Semua endpoint membutuhkan API key di header:</p>
            <code className="text-xs font-mono text-teal-400/80 mt-1 block">Authorization: Bearer YOUR_API_KEY</code>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar nav */}
          <aside className="lg:col-span-1">
            <div className="glass-card rounded-xl p-4 sticky top-24">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Endpoint</p>
              <nav className="space-y-1">
                {ENDPOINTS.map(ep => (
                  <button key={ep.id} onClick={() => setActive(ep.id)}
                    className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all ${active === ep.id ? "text-teal-400 border border-teal-500/20" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`}
                    style={active === ep.id ? { background: "rgba(20,184,166,0.08)" } : {}}>
                    <MethodBadge method={ep.method} />
                    <span className="truncate text-xs">{ep.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="lg:col-span-3 space-y-6">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <MethodBadge method={endpoint.method} />
                <code className="text-sm font-mono text-teal-400">{endpoint.path}</code>
              </div>
              <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{endpoint.title}</h2>
              <p className="text-slate-400 text-sm">{endpoint.description}</p>

              {endpoint.params.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-medium text-slate-300 mb-3">Parameter Query</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border border-slate-800 rounded-lg overflow-hidden">
                      <thead style={{ background: "rgba(15,23,42,0.8)" }}>
                        <tr className="text-slate-400">
                          <th className="text-left px-4 py-2 font-medium">Nama</th>
                          <th className="text-left px-4 py-2 font-medium">Tipe</th>
                          <th className="text-left px-4 py-2 font-medium">Wajib</th>
                          <th className="text-left px-4 py-2 font-medium">Deskripsi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {endpoint.params.map(p => (
                          <tr key={p.name} className="hover:bg-slate-800/20">
                            <td className="px-4 py-2 font-mono text-teal-400">{p.name}</td>
                            <td className="px-4 py-2 text-slate-400">{p.type}</td>
                            <td className="px-4 py-2">{p.required ? <span className="badge-red">Ya</span> : <span className="text-slate-500">Tidak</span>}</td>
                            <td className="px-4 py-2 text-slate-400">{p.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Example request */}
            <div className="glass-card rounded-xl p-6">
              <p className="text-sm font-medium text-slate-300 mb-3">Contoh Request</p>
              <pre className="code-block text-xs leading-relaxed overflow-x-auto">{endpoint.example}</pre>
            </div>

            {/* Example response */}
            <div className="glass-card rounded-xl p-6">
              <p className="text-sm font-medium text-slate-300 mb-3">Contoh Response</p>
              <pre className="code-block text-xs leading-relaxed overflow-x-auto">{endpoint.response}</pre>
            </div>

            {/* Try It */}
            <div className="glass-card rounded-xl p-6 border border-teal-500/20">
              <h3 className="font-semibold text-white mb-4 text-sm">🧪 Coba Sekarang</h3>
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">API Key</label>
                  <input type="text" placeholder="hara_xxxxxxxx-xxxxxxxx-xxxxxxxx"
                    className="input-field text-xs" value={tryApiKey}
                    onChange={e => setTryApiKey(e.target.value)} />
                </div>
                {endpoint.params.map(p => (
                  <div key={p.name}>
                    <label className="block text-xs text-slate-400 mb-1">
                      {p.name} {p.required && <span className="text-red-400">*</span>}
                    </label>
                    <input type="text" placeholder={p.desc}
                      className="input-field text-xs"
                      value={tryInput[`${endpoint.id}_${p.name}`] || ""}
                      onChange={e => setTryInput(prev => ({ ...prev, [`${endpoint.id}_${p.name}`]: e.target.value }))} />
                  </div>
                ))}
              </div>
              <button onClick={() => handleTry(endpoint)} disabled={tryLoading[endpoint.id]}
                className="btn-primary text-sm px-6 py-2.5 disabled:opacity-60">
                {tryLoading[endpoint.id] ? "Mengirim..." : "▶ Kirim Request"}
              </button>
              {tryResult[endpoint.id] && (
                <div className="mt-4">
                  <p className="text-xs text-slate-400 mb-2">Response:</p>
                  <pre className="code-block text-xs leading-relaxed overflow-x-auto max-h-64">{tryResult[endpoint.id]}</pre>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
