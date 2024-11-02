import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { add, getMany, getOne, remove, update } from "../services/CRUD";

import { ExtendedRequest } from "../utils/Types/request/request";
import { addProduct } from "./productController";
import { addSlugAttribute } from "../middlewares/slug";
import asyncHandler from "express-async-handler";
import { prisma } from "../prisma/config/prismaConfig";
import slugify from "slugify";
import user from "../routes/Admin/userRoute";

type ModelName = keyof typeof Prisma.ModelName;
const modelName: ModelName = "cart";
// cart CRUD
export const getCart = async (user_id: number) => {
  const cart = await prisma.cart.findUnique({
    where: { user_id },
    include: { cartItems: true },
  });
  return cart;
};
// create cart
export const createCart = async (user_id: number) => {
  const cart = await prisma.cart.create({
    data: {
      cart_id: user_id,
      user_id: user_id,
    },
  });
  return cart;
};
// update cart
export const updateCart = async (
  user_id: number,
  data: Prisma.cartUpdateInput
) => {
  const cart = await prisma.cart.update({
    where: { user_id },
    data,
  });
  return cart;
};
//     // check if copon is valid and exists or not
// if (copon_id) {
//   const copon = await validateCopon(copon_id);
//   if (copon == null) {
//     res.status(404);
//     next(new ApiError("Copon Not Valid", 404));
//   }
//   if (copon == false) {
//     res.status(404);
//     next(new ApiError("Copon not found", 404));
//   }
// }
