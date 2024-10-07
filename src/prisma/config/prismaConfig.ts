// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import path from "path";

// Create a singleton instance
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${path.resolve(__dirname, "../../prisma/dev.db")}`,
    },
  },
});

export { prisma };
