import * as bcrypt from "bcrypt";

import {
  PrismaClient,
  category,
  product,
  subcategory,
  user,
  wishList,
} from "@prisma/client";

import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

export const cleanUp = async () => {
  await prisma.wishList.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  console.log("Database cleaned up successfully.");
};
