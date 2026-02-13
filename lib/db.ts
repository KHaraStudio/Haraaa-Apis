import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

/**
 * Adapter agar kompatibel dengan "pg" style
 * Jadi semua code lama tetap jalan (rowCount, rows, dll)
 */
export const pool = {
  async query(query: string, params: any[] = []) {
    try {
      const rows = await sql(query, params);

      return {
        rows,
        rowCount: rows.length, // ← ini yang bikin middleware kamu hidup lagi
      };
    } catch (err) {
      console.error("DB Query Error:", err);
      throw err;
    }
  },
};
