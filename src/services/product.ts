import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient, product, user } from "@prisma/client";

import asyncHandler from "express-async-handler";
import { prisma } from "../prisma/config/prismaConfig";
import slugify from "slugify";

export const productExistence = async (product_id: number) => {
  const product = await prisma.product.findUnique({
    where: { product_id },
  });
  if (!product) {
    return false;
  }

  return product;
};
