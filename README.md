# 🚀 Hara API Service

Platform REST API gratis untuk developer Indonesia. Dibangun dengan Next.js 14, Prisma, dan TailwindCSS.

---

## 📁 Struktur Folder

```
hara-api/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts    # POST - Daftar akun baru
│   │   │   ├── login/route.ts       # POST - Login
│   │   │   ├── logout/route.ts      # POST - Logout
│   │   │   └── me/route.ts          # GET  - Data user aktif
│   │   ├── dashboard/
│   │   │   ├── stats/route.ts       # GET  - Statistik penggunaan
│   │   │   ├── logs/route.ts        # GET  - Log request
│   │   │   └── regenerate-key/route.ts  # POST - Regenerasi API key
│   │   ├── quote/random/route.ts    # GET  - Quote acak
│   │   ├── tools/
│   │   │   ├── base64/encode/route.ts   # GET  - Encode Base64
│   │   │   ├── base64/decode/route.ts   # GET  - Decode Base64
│   │   │   └── hash/md5/route.ts        # GET  - Hash MD5/SHA
│   │   ├── image/placeholder/route.ts   # GET  - Placeholder image
│   │   └── info/ip/route.ts             # GET  - Info IP
│   ├── dashboard/
│   │   ├── layout.tsx               # Layout dashboard (sidebar + auth guard)
│   │   ├── page.tsx                 # Overview dashboard
│   │   ├── api-keys/page.tsx        # Kelola API key
│   │   ├── usage/page.tsx           # Statistik penggunaan
│   │   └── account/page.tsx         # Profil akun
│   ├── docs/page.tsx                # Dokumentasi interaktif API
│   ├── login/page.tsx               # Halaman login
│   ├── register/page.tsx            # Halaman registrasi
│   ├── page.tsx                     # Landing page
│   ├── not-found.tsx                # Halaman 404
│   ├── layout.tsx                   # Root layout
│   └── globals.css                  # Style global + glassmorphism
├── components/
│   └── ui/
│       ├── Navbar.tsx               # Navigasi publik
│       └── Footer.tsx               # Footer
├── lib/
│   ├── prisma.ts                    # Singleton Prisma client
│   ├── auth.ts                      # JWT + bcrypt utilities
│   └── apiUtils.ts                  # Rate limiter, response helpers
├── middleware/
│   ├── withApiAuth.ts               # Middleware validasi API key
│   ├── withAuth.ts                  # Middleware auth cookie (dashboard)
│   └── validateApiKey.ts            # Re-export shim
├── prisma/
│   └── schema.prisma                # Skema database (User, ApiLog)
├── .env.example                     # Contoh environment variables
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ⚙️ Instalasi & Menjalankan

### 1. Clone / extract project

```bash
cd hara-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
cp .env.example .env
```

Edit `.env` jika diperlukan (default sudah siap untuk development).

### 4. Setup database

```bash
npm run db:generate   # Generate Prisma client
npm run db:push       # Buat tabel di SQLite
```

### 5. Jalankan development server

```bash
npm run dev
```

Buka **http://localhost:3000** di browser.

---

## 🌍 Environment Variables

| Variabel             | Keterangan                          | Default                           |
|----------------------|-------------------------------------|-----------------------------------|
| `DATABASE_URL`       | Path database SQLite                | `file:./dev.db`                   |
| `JWT_SECRET`         | Secret key untuk JWT                | `hara-api-secret-2024`            |
| `NEXT_PUBLIC_APP_URL`| URL aplikasi                        | `http://localhost:3000`           |
| `NODE_ENV`           | Environment                         | `development`                     |

---

## 🔑 Cara Menggunakan API

### 1. Daftar akun di `/register` untuk mendapatkan API key

### 2. Gunakan API key di setiap request:

```bash
curl -X GET "http://localhost:3000/api/quote/random" \
  -H "Authorization: Bearer hara_xxxxxxxx-xxxxxxxx-xxxxxxxx"
```

### 3. Response format standar:

```json
{
  "status": true,
  "creator": "Hara API",
  "message": "Berhasil",
  "data": { ... }
}
```

---

## 📡 Daftar Endpoint API

| Method | Endpoint                        | Deskripsi                   |
|--------|---------------------------------|-----------------------------|
| GET    | `/api/quote/random`             | Quote motivasi acak         |
| GET    | `/api/tools/base64/encode`      | Encode teks ke Base64       |
| GET    | `/api/tools/base64/decode`      | Decode Base64 ke teks       |
| GET    | `/api/tools/hash/md5`           | Hash MD5, SHA1, SHA256      |
| GET    | `/api/image/placeholder`        | Generate placeholder image  |
| GET    | `/api/info/ip`                  | Info IP & User-Agent        |

### Parameter Query

**Base64 Encode/Decode:** `?text=HelloWorld`  
**Hash MD5:** `?text=HelloWorld`  
**Placeholder Image:** `?text=Hello&width=400&height=200&bg=14b8a6&color=ffffff`

---

## ⚡ Rate Limiting

- **100 request per jam** per API key
- Header response: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- Saat terlampaui: HTTP 429 Too Many Requests

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS (dark mode, glassmorphism)
- **Database:** SQLite via Prisma ORM
- **Auth:** JWT (jsonwebtoken) + bcryptjs
- **Runtime:** Node.js (Next.js route handlers)

---

## 📝 Scripts

```bash
npm run dev          # Development server
npm run build        # Build production
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema ke database
npm run db:studio    # Buka Prisma Studio (GUI database)
```
