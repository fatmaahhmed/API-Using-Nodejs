import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient, user } from "@prisma/client";
import { addCart, getCart } from "./cartController";
import { cartItemExistence, createCartItem } from "../services/cartItem";
import { productExistence, updateProduct } from "../services/product";

import ApiError from "../utils/err/ApiErrorHandler";
import { and } from "sequelize";
import asyncHandler from "express-async-handler";
import { get } from "http";
import { prisma } from "../prisma/config/prismaConfig";
import slugify from "slugify";
import { validateCopon } from "../services/copon";

type ModelName = keyof typeof Prisma.ModelName;
const modelName: ModelName = "cartItem";

// cartItem CRUDs
export const addCartItem = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let { product_id, quantity, copon_id } = req.body;
    // find and create cart
    const cart = await getCart(+req.params.user_id);
    if (!cart) {
      // create new cart
      const cart = await addCart(+req.params.user_id);
    }
    // validate product
    const product = await productExistence(product_id);
    // check if quantity is available
    if (product && product.quantity < quantity) {
      res.status(400);
      next(new ApiError("Product quantity is not available", 400));
      return;
    }
    // Find existing cart item or create a new one
    let cartItem = await cartItemExistence(product_id, +req.params.user_id);
    if (cartItem && product) {
      // update cart item
      const updatedCartItem = await prisma.cartItem.update({
        where: { cartItem_id: cartItem.cartItem_id },
        data: {
          quantity: cartItem.quantity + quantity,
          subtotal: cartItem.subtotal + quantity * product.price,
        },
      });
    } else if (cartItem == false && product) {
      await createCartItem(
        +req.params.user_id,
        product_id,
        quantity,
        product.price,
        quantity * product.price
      );
    }

    res.status(201).json({
      message: "Cart item added successfully",
    });
  }
);
