import { Prisma, PrismaClient, product } from "@prisma/client";
import { add, getMany, getOne, remove, update } from "../../services/CRUD";
type ModelName = keyof typeof Prisma.ModelName;

const modelName: ModelName = "product";
export const addProduct = add(modelName);
export const updateProduct = update(modelName);
export const deleteProduct = remove(modelName);
export const getProduct = getOne(modelName);
export const getPaginatedProducts = getMany(modelName);
