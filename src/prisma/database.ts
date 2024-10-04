import { Database, open } from "sqlite";

import dotenv from "dotenv";
import path from "path";
import sqlite3 from "sqlite3";

dotenv.config();
async function enableForeignKeySupport(db: Database) {
  await db.exec("PRAGMA foreign_keys = ON;");
}
const databasePath = process.env.DATABASE_PATH
  ? path.resolve(process.env.DATABASE_PATH)
  : path.resolve("./INTERN-database.db");
export const sqlConnection = (async () => {
  const db = await open({
    filename: databasePath,
    driver: sqlite3.Database,
  });
  await enableForeignKeySupport(db);

  return db;
})();
