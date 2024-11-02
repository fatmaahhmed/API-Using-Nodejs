import { Prisma, PrismaClient, product, user } from "@prisma/client";
import e, { NextFunction, Request, Response } from "express";

import ApiError from "../utils/err/ApiErrorHandler";
import asyncHandler from "express-async-handler";
import { prisma } from "../prisma/config/prismaConfig";
import slugify from "slugify";

export const productExistence = async (product_id: number) => {
  const product = await prisma.product.findUnique({
    where: { product_id },
  });
  if (!product) {
    new ApiError("Product not found", 404);
  } else if (product) {
    if (product.quantity < 1) {
      new ApiError("Product is out of stock", 404);
    } else {
      return product;
    }
  }
};
// update product
export const updateProduct = async (
  product_id: number,
  data: Prisma.productUpdateInput
) => {
  const product = await prisma.product.update({
    where: { product_id },
    data,
  });
  return product;
};
