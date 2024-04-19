// dbConnection.js
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: process.argv[3],
  user: process.argv[4],
  password: process.argv[5],
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error.message);
    throw error;
  }
};

const disconnectDB = async (client) => {
  try {
    await client.release();
  } catch (error) {
    console.error("Error al desconectar de la base de datos:", error.message);
    throw error;
  } finally {
    pool.end();
  }
};

module.exports = { connectDB, disconnectDB };
