import { add, getMany, getOne, update } from "../../services/CRUD";

import { Prisma } from "@prisma/client";
import asyncHandler from "express-async-handler";
import { prisma } from "../../prisma/config/prismaConfig";

type ModelName = keyof typeof Prisma.ModelName;
const modelName: ModelName = "product";
export const addProduct = add(modelName);
export const updateProduct = update(modelName);
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { product_id } = req.params;
  const result = await prisma.product.delete({
    where: {
      product_id: +product_id,
    },
  });
  res.status(200).json({
    message: "Product deleted successfully",
    product: result,
  });
});
export const getProduct = getOne(modelName);
export const getPaginatedProducts = getMany(modelName);
