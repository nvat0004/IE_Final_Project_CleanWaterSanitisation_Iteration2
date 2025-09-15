// backend/src/db.js
import dotenv from "dotenv";
dotenv.config(); // Load .env early

import mysql from "mysql2/promise";

// Create pool
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// Test connection to show clear error
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MySQL connected!");
    conn.release();
  } catch (err) {
    console.error("❌ MySQL connection failed:");
    console.error(err); // ✅ Log full error, not just message
    process.exit(1);
  }
})();