import { prisma } from "./config";

export async function showTables() {
  try {
    // Query the SQLite schema to list all tables
    const result = await prisma.$queryRaw`
          SELECT name FROM sqlite_master WHERE type='table';
        `;

    console.log("Tables in the database:", result);
  } catch (error) {
    console.error("Error fetching tables:", error);
  }
}
