// backend/scripts/seed.js
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import mysql from "mysql2/promise";
import fs from "fs";
import csv from "csv-parser";

// ✅ Create connection pool using .env
const pool = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
});

// ✅ Ensure tables with correct schema
async function ensureTables() {
  const conn = await pool.getConnection();

  // Drop and recreate water_quality table
  await conn.query(`DROP TABLE IF EXISTS water_quality`);
  await conn.query(`
    CREATE TABLE water_quality (
      id INT AUTO_INCREMENT PRIMARY KEY,
      site_name VARCHAR(255),
      date DATE,
      temperature FLOAT,
      turbidity FLOAT,
      ph FLOAT,
      salinity FLOAT
    );
  `);

  // Drop and recreate enterococci table with beach column
  await conn.query(`DROP TABLE IF EXISTS enterococci`);
  await conn.query(`
    CREATE TABLE enterococci (
      id INT AUTO_INCREMENT PRIMARY KEY,
      site_name VARCHAR(255),
      date DATE,
      enterococci_level INT,
      beach VARCHAR(255)
    );
  `);

  // Drop and recreate daily_rainfall table with beach column
  await conn.query(`DROP TABLE IF EXISTS daily_rainfall`);
  await conn.query(`
    CREATE TABLE daily_rainfall (
      id INT AUTO_INCREMENT PRIMARY KEY,
      site_name VARCHAR(255),
      date DATE,
      rainfall_mm FLOAT,
      beach VARCHAR(255)
    );
  `);

  conn.release();
  console.log("✅ Tables dropped and recreated successfully");
}

// ✅ CSV loader
async function loadCSV(filename) {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filename)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}

// ✅ Insert water_quality
async function insertWaterQuality() {
  const conn = await pool.getConnection();
  const data = await loadCSV("./datasets/water_quality_cleaned.csv");

  for (const row of data) {
    await conn.query(
      `INSERT INTO water_quality (site_name, date, temperature, turbidity, ph, salinity) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        row.site_name,
        row.date,
        row.temperature,
        row.turbidity,
        row.ph,
        row.salinity,
      ]
    );
  }

  conn.release();
  console.log(`✅ water_quality: inserted ${data.length} rows`);
}

// ✅ Insert enterococci
async function insertEnterococci() {
  const conn = await pool.getConnection();
  const data = await loadCSV("./datasets/enterococci_cleaned.csv");

  for (const row of data) {
    await conn.query(
      `INSERT INTO enterococci (site_name, date, enterococci_level, beach) VALUES (?, ?, ?, ?)`,
      [row.site_name, row.date, row.enterococci_level, row.beach]
    );
  }

  conn.release();
  console.log(`✅ enterococci: inserted ${data.length} rows`);
}

// ✅ Insert daily_rainfall
async function insertRainfall() {
  const conn = await pool.getConnection();
  const data = await loadCSV("./datasets/daily_rainfall_cleaned.csv");

  for (const row of data) {
    await conn.query(
      `INSERT INTO daily_rainfall (site_name, date, rainfall_mm, beach) VALUES (?, ?, ?, ?)`,
      [row.site_name, row.date, row.rainfall_mm, row.beach]
    );
  }

  conn.release();
  console.log(`✅ daily_rainfall: inserted ${data.length} rows`);
}

// ✅ Main function
async function main() {
  try {
    await ensureTables();
    await insertWaterQuality();
    await insertEnterococci();
    await insertRainfall();

    console.log("🎉 Seeding complete");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();
