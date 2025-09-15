// test-db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await connection.query("SELECT 1 + 1 AS result");
    console.log("✅ Connected! Test result:", rows[0].result);
    await connection.end();
  } catch (error) {
    console.error("❌ Connection failed:", error);
  }
}

testConnection();
