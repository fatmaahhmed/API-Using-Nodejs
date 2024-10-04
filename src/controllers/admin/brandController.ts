import { Prisma, PrismaClient } from "@prisma/client";
import { add, getMany, getOne, remove, update } from "../../services/CRUD";
type ModelName = keyof typeof Prisma.ModelName;
const modelName: ModelName = "brand";
export const addBrand = add(modelName);
export const updateBrand = update(modelName);
export const deleteBrand = remove(modelName);
export const getBrand = getOne(modelName);
export const getPaginatedBrands = getMany(modelName);
