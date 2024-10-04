import { Database, open } from "sqlite";

import dotenv from "dotenv";
import path from "path";
import sqlite3 from "sqlite3";

// Load .env from root directory
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

async function enableForeignKeySupport(db: Database) {
  await db.exec("PRAGMA foreign_keys = ON;");
}

// Resolve the database path relative to the current file
const databasePath = process.env.DATABASE_URL
  ? path.resolve(
      __dirname,
      "../../",
      process.env.DATABASE_URL.replace("file:", "")
    )
  : path.resolve(__dirname, "./INTERN-database.db");

console.log("Database path:", databasePath);

export const sqlConnection = async () => {
  try {
    const db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    await enableForeignKeySupport(db);
    return db;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};
