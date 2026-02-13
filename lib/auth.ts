import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const SECRET = process.env.JWT_SECRET || "hara-fallback-secret";
export interface JWTPayload { userId: string; email: string; username: string; iat?: number; exp?: number; }
export const signToken = (p: Omit<JWTPayload,"iat"|"exp">) => jwt.sign(p, SECRET, { expiresIn:"7d" });
export function verifyToken(t: string): JWTPayload | null { try { return jwt.verify(t, SECRET) as JWTPayload; } catch { return null; } }
export const hashPassword    = (p: string) => bcrypt.hash(p, 12);
export const comparePassword = (p: string, h: string) => bcrypt.compare(p, h);
export function extractBearer(h: string | null): string | null { if (!h?.startsWith("Bearer ")) return null; return h.slice(7).trim() || null; }
