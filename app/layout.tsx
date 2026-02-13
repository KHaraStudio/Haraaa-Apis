import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Hara API Service – Platform REST API Gratis",
  description: "Platform REST API gratis untuk developer Indonesia.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
