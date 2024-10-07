// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import path from "path";

// Create a singleton instance
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${path.resolve(__dirname, "../../prisma/sqlite.db")}`,
    },
  },
});

// Handle potential errors
prisma.$use(async (params, next) => {
  try {
    return await next(params);
  } catch (error) {
    console.error("Prisma Error:", error);
    throw error;
  }
});

// Ensure the connection is properly closed when the Node process ends
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export { prisma };
