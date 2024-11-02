import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient, cartItem, product, user } from "@prisma/client";

import asyncHandler from "express-async-handler";
import { prisma } from "../prisma/config/prismaConfig";
import slugify from "slugify";

// check cartItem existence

export const cartItemExistence = async (
  user_id: number,
  product_id: number
) => {
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      cart_id: user_id,
      product_id,
    },
  });
  if (!cartItem) {
    return false;
  }

  return cartItem;
};
// create cartItem
export const createCartItem = async (
  user_id: number,
  product_id: number,
  quantity: number,
  unit_price: number,
  subtotal: number
) => {
  const cartItem = await prisma.cartItem.create({
    data: {
      cart_id: user_id,
      product_id,
      quantity,
      unit_price,
      subtotal,
    },
  });
  return cartItem;
};
