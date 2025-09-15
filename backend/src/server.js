// ✅ server.js — ES Module Compatible
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());

// DB connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function getSafetyStatus(value) {
  if (value <= 35) return "Safe";
  if (value <= 104) return "Moderate";
  return "Dangerous";
}

function getReason(value) {
  if (value <= 35) return "Safe — Enterococci levels are within safe range (0–35)";
  if (value <= 104) return "Moderate — Caution advised due to moderate Enterococci levels (36–104)";
  return "Dangerous — Swimming not advised (Enterococci >104)";
}

// ✅ Today's Swimming Safety — now with variation for demo
app.get("/api/today-safety", async (req, res) => {
  try {
    const site = req.query.beach || "Frankston Beach";

    const [result] = await pool.query(
      `SELECT date, enterococci_level 
       FROM enterococci 
       WHERE LOWER(site_name) = LOWER(?) 
       ORDER BY date DESC 
       LIMIT 30`,
      [site]
    );

    if (!result.length) {
      return res.json({ status: "No Data", reason: "No safety data found." });
    }

    // Calculate moving average from latest 30 records
    const avg =
      result.reduce((sum, row) => sum + (row.enterococci_level || 0), 0) / result.length;

    // 🎯 Add variation: avg - 40 to avg + 80
    const simulated = avg + Math.round(Math.random() * 120 - 40);
    const finalValue = Math.max(0, simulated); // avoid negative values

    res.json({
      status: getSafetyStatus(finalValue),
      reason: getReason(finalValue),
      date: new Date().toISOString().split("T")[0],
    });
  } catch (err) {
    console.error("/api/today-safety error:", err);
    res.status(500).send("Server error");
  }
});

// ✅ 7-Day Prediction (unchanged)
app.get("/api/predict", async (req, res) => {
  try {
    const site = req.query.beach || "Frankston Beach";
    const [rows] = await pool.query(
      `SELECT date, enterococci_level 
       FROM enterococci 
       WHERE LOWER(site_name) = LOWER(?) 
       ORDER BY date DESC 
       LIMIT 30`,
      [site]
    );

    if (!rows.length) {
      return res.json([]);
    }

    const avg =
      rows.reduce((sum, row) => sum + (row.enterococci_level || 0), 0) / rows.length;

    const predictions = Array.from({ length: 7 }, (_, i) => {
      const predicted = avg + Math.round(Math.random() * 120 - 40);
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + i);
      return {
        date: futureDate.toISOString().split("T")[0],
        status: getSafetyStatus(predicted),
        reason: getReason(predicted),
      };
    });

    res.json(predictions);
  } catch (err) {
    console.error("/api/predict error:", err);
    res.status(500).send("Prediction error");
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
