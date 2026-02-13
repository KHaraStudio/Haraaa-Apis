import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL!;

// buat koneksi
const sql = neon(databaseUrl);

export default sql;
export { sql };
