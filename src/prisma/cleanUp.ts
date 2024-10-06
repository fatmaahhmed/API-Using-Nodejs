import * as bcrypt from "bcrypt";

import {
  PrismaClient,
  category,
  product,
  user,
  wishList,
} from "@prisma/client";

import asyncHandler from "express-async-handler";
import { prisma } from "../prisma/config";

export const cleanUp = async () => {
  await prisma.wishList.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  console.log("Database cleaned up successfully.");
};
