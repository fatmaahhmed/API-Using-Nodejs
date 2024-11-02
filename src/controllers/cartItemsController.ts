import { NextFunction, Request, Response } from "express";
import { cartItemExistence, createCartItem } from "../services/cartItem";
import { createCart, getCart, updateCart } from "./cartController";
import { productExistence, updateProduct } from "../services/product";

import ApiError from "../utils/err/ApiErrorHandler";
import { ExtendedRequest } from "../utils/Types/request/request";
import asyncHandler from "express-async-handler";
import { prisma } from "../prisma/config/prismaConfig";

// cartItem CRUDs
export const addCartItem = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    let { product_id, quantity, copon_id } = req.body;
    const userId = +req.params.user_id;
    // validate product
    const product = await productExistence(product_id);
    // check if quantity is available
    if (product && product.quantity < quantity) {
      res.status(400);
      next(new ApiError("Product quantity is not available", 400));
      return;
    }
    // Find existing cart item or create a new one
    let cartItem = await cartItemExistence(product_id, userId);
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
        userId,
        product_id,
        quantity,
        product.price,
        quantity * product.price
      );
    }
    // update cart

    let cart = await getCart(userId);
    if (!cart) {
      cart = (await createCart(userId)) as any;
    }
    // update cart total
    if (cart && product) {
      await updateCart(userId, {
        total_price: cart.total_price + quantity * product.price,
      });

      res.status(201).json({
        message: "Cart item added successfully",
      });
    } else {
      res.status(400);
      next(new ApiError("Cart or product not found", 400));
    }
  }
);
// get all cart items
export const getCartItems = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const userId = +req.params.user_id;
    const cartItems = await prisma.cartItem.findMany({
      where: { cart_id: userId },
      select: {
        product_id: true,
        quantity: true,
        unit_price: true,
        subtotal: true,
        createdAt: true,
        product: {
          select: {
            product_name: true,
            price: true,
            quantity: true,
            description: true,
          },
        },
        cart: {
          select: {
            total_price: true,
          },
        },
      },
    });
    res.status(200).json(cartItems);
  }
);
// update cart item
export const updateCartItem = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const userId = +req.params.user_id;
    const { cartItem_id, quantity } = req.body;
    const cartItem = await prisma.cartItem.findUnique({
      where: { cartItem_id },
    });
    if (cartItem) {
      const product = await productExistence(cartItem.product_id);
      if (product && product.quantity < quantity) {
        res.status(400);
        next(new ApiError("Product quantity is not available", 400));
        return;
      }
      const updatedCartItem = await prisma.cartItem.update({
        where: { cartItem_id },
        data: {
          quantity,
          subtotal: quantity * cartItem.unit_price,
        },
      });
      // update cart
      let cart = await getCart(userId);
      if (cart && product) {
        await updateCart(userId, {
          total_price: cart.total_price + quantity * product.price,
        });
        res.status(200).json({
          message: "Cart item updated successfully",
        });
      } else {
        res.status(400);
        next(new ApiError("Cart or product not found", 400));
      }
    } else {
      res.status(404);
      next(new ApiError("Cart item not found", 404));
    }
  }
);
// remove cart item
export const removeCartItem = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const userId = +req.params.user_id;
    const { cartItem_id } = req.body;
    const cartItem = await prisma.cartItem.findUnique({
      where: { cartItem_id },
    });
    if (cartItem) {
      await prisma.cartItem.delete({
        where: { cartItem_id },
      });
      // update cart
      let cart = await getCart(userId);
      if (cart) {
        await updateCart(userId, {
          total_price: cart.total_price - cartItem.subtotal,
        });
        res.status(200).json({
          message: "Cart item removed successfully",
        });
      } else {
        res.status(400);
        next(new ApiError("Cart not found", 400));
      }
    } else {
      res.status(404);
      next(new ApiError("Cart item not found", 404));
    }
  }
);
