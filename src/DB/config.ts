import { showTables } from "../prisma/showtables";
import { sqlConnection } from "../prisma/database";

export async function databaseconfig() {
  try {
    const db = await sqlConnection();
    console.log("Database connection established:", db);
    await showTables();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}
