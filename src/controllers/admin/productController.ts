import { NextFunction, Response } from "express";
import { add, getMany, getOne, update } from "../../services/CRUD";

import { ExtendedRequest } from "../../utils/Types/request/request";
import { Prisma } from "@prisma/client";
import { addSlugAttribute } from "../../middlewares/slug";
import asyncHandler from "express-async-handler";
import { prisma } from "../../prisma/config/prismaConfig";

type ModelName = keyof typeof Prisma.ModelName;
const modelName: ModelName = "product";
export const addProduct = [addSlugAttribute("product_name"), add(modelName)];
export const updateProduct = update(modelName);
export const deleteProduct = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { product_id } = req.params;

    const where: {
      product_id: number;
      user_id?: number;
    } = {
      product_id: Number(product_id),
    };

    if (req.role === "User") {
      where.user_id = +req.params.user_id;
    }

    const result = await prisma.product.delete({
      where,
    });

    res.status(200).json({
      message: "Product deleted successfully",
      product: result,
    });
  }
);
export const getProduct = getOne(modelName);
export const getPaginatedProducts = getMany(modelName);
