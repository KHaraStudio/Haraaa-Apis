import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL!;
const sql = neon(databaseUrl);

/**
 * Adapter agar kompatibel dengan kode lama:
 * pool.query("SELECT * FROM users WHERE id=$1", [id])
 */
export const pool = {
  async query(text: string, params?: any[]) {
    try {
      // ubah $1 $2 $3 → ${}
      if (!params || params.length === 0) {
        const result = await sql(text as any);
        return { rows: result };
      }

      // konversi parameter postgres style
      let index = 0;
      const parsed = text.replace(/\$(\d+)/g, () => {
        const value = params[index++];
        return `'${value}'`;
      });

      const result = await sql(parsed as any);
      return { rows: result };
    } catch (err) {
      console.error("DB ERROR:", err);
      throw err;
    }
  }
};

export default sql;
export { sql };
