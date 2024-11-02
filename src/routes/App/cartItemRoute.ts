import {
  addCartItem,
  getCartItems,
  removeCartItem,
  updateCartItem,
} from "../../controllers/cartItemsController";
import express, { NextFunction, Request, Response } from "express";

import { isAuthenticated } from "../../middlewares/auth/verifyTokenWithOptionalRole";

export const cartItem = express.Router();
cartItem.use(isAuthenticated());

cartItem.get("/", getCartItems);

cartItem.post("/", addCartItem);

cartItem.put("/:cartItem_id", updateCartItem);

cartItem.delete("/:cartItem_id", removeCartItem);
