const mysql = require("mysql2/promise");

let pool;

async function initializePool() {
  try {
    const poolConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };

    pool = await mysql.createPool(poolConfig);
    console.log("Database pool initialized successfully");
    return pool;
  } catch (err) {
    console.error("Error initializing database pool:", err);
    throw err;
  }
}

function getPool() {
  if (!pool) {
    throw new Error("Database pool not initialized. Call initializePool() first.");
  }
  return pool;
}

module.exports = { initializePool, getPool };