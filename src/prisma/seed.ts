import ApiError from "../utils/err/ApiErrorHandler";
import { PrismaClient } from "@prisma/client";
import { handlePrismaError } from "../utils/err/handlePrismaerror";
import { hashPassword } from "../utils/hashPassword";

const prisma = new PrismaClient();

function generateRandomString(length: number): string {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

function generateRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export async function main() {
  try {
    // Create 20 Admin users
    for (let i = 0; i < 20; i++) {
      const password = await hashPassword(`hashedpassword${i + 1}`);
      await prisma.admin.create({
        data: {
          user_id: i + 1,
          username: `admin${i + 1}`,
          name: `Admin User ${i + 1}`,
          email: `admin${i + 1}@example.com`,
          password: password,
          role: "Admin",
        },
      });
    }
    console.log("Added admin data");

    // Create 20 Categories
    for (let i = 0; i < 20; i++) {
      await prisma.category.create({
        data: {
          category_id: i + 1,
          category_name: `Category ${i + 1}`,
          user: i + 1,
        },
      });
    }
    console.log("Added Categories data");

    // Create 20 SubCategories
    for (let i = 0; i < 20; i++) {
      await prisma.subcategory.create({
        data: {
          subcategory_id: i + 1,
          subcategory_name: `SubCategory ${i + 1}`,
          category_id: i + 1,
          parent_id: null,
        },
      });
    }
    console.log("Added subCategory data");

    // Create 20 Users
    for (let i = 0; i < 20; i++) {
      await prisma.user.create({
        data: {
          user_id: i + 1,
          username: `user${i + 1}`,
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          password: await hashPassword(`hashedpassword${i + 100}`),
          role: "User",
        },
      });
    }
    console.log("Added users data");

    // Create 20 Products
    for (let i = 0; i < 20; i++) {
      await prisma.product.create({
        data: {
          product_id: i + 1,
          name: `Product ${i + 1}`,
          description: `Description for Product ${i + 1}`,
          price: parseFloat((Math.random() * 1000).toFixed(2)),
          quantity: Math.floor(Math.random() * 100) + 1,
          brand: `Brand ${(i % 5) + 1}`,
          rating: parseFloat((Math.random() * 5).toFixed(1)),
          reviews_count: Math.floor(Math.random() * 1000),
          is_best_seller: Math.random() > 0.5,
          is_on_sale: Math.random() > 0.7,
          sale_start_date: generateRandomDate(new Date(2023, 0, 1), new Date()),
          sale_end_date: generateRandomDate(new Date(), new Date(2025, 11, 31)),
          discount_price: parseFloat((Math.random() * 500).toFixed(2)),
          category_id: i + 1,
          subcategory_id: i + 1, // Changed from null to i + 1
          user_id: i + 1,
        },
      });
    }
    console.log("Added products data");

    // Create 20 WishList items
    for (let i = 0; i < 20; i++) {
      await prisma.wishList.create({
        data: {
          product_id: i + 1,
          user_id: i + 1,
        },
      });
    }
    console.log("Added wishLists data");
  } catch (error) {
    console.error("Error seeding database:", error);
    console.log(handlePrismaError(error));

    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
