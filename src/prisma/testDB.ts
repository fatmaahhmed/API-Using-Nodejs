import { prisma } from "./config/prismaConfig";

export async function testDB() {
  try {
    await prisma.$connect();
    // Try a simple query
    await prisma.user.count();
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}
