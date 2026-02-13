import { v4 as uuidv4 } from "uuid";
export function generateApiKey(): string { const r = uuidv4().replace(/-/g,""); return `hara_${r.slice(0,8)}-${r.slice(8,16)}-${r.slice(16,24)}`; }
const store = new Map<string,{count:number;resetAt:number}>();
export const RATE_LIMIT = 100;
export const RATE_WINDOW = 3600_000;
export interface RLResult { allowed:boolean; remaining:number; resetAt:number; }
export function checkRateLimit(key: string): RLResult {
  const now = Date.now(); let e = store.get(key);
  if (!e || e.resetAt <= now) { e = { count:0, resetAt: now+RATE_WINDOW }; store.set(key,e); }
  e.count++;
  return { allowed: e.count <= RATE_LIMIT, remaining: Math.max(0, RATE_LIMIT - e.count), resetAt: e.resetAt };
}
export const ok   = <T>(data: T, message = "Berhasil") => ({ status:true,  creator:"Hara API", message, data });
export const fail = (message: string, code = 400)      => ({ status:false, creator:"Hara API", message, code });
export function getClientIp(h: Headers): string {
  return h.get("cf-connecting-ip") || h.get("x-real-ip") || (h.get("x-forwarded-for")||"").split(",")[0].trim() || "127.0.0.1";
}
export const isEmail    = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const isUsername = (v: string) => /^[a-zA-Z0-9_]{3,20}$/.test(v);
export const isPassOk   = (v: string) => v.length >= 6;
