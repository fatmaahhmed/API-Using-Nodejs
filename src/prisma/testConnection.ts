import { prisma } from "./config/prismaConfig";

export async function testConnection() {
  try {
    // Attempt a simple query to test the connection
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Database connection successful");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}
