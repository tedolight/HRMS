import mysql from "mysql2/promise";
import "dotenv/config";

// ── Connection Pool ────────────────────────────────────────────
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "utf8mb4",
});

// ── Verify connection on startup ───────────────────────────────
export async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT DATABASE() AS db, NOW() AS time");
    console.log(
      ` MySQL connected succesfully "${rows[0].db}"  |  server time: ${rows[0].time}`,
    );
  } catch (err) {
    console.error(" MySQL connection failed:", err.message);
    process.exit(1);
  } finally {
    if (conn) conn.release();
  }
}

export default pool;
