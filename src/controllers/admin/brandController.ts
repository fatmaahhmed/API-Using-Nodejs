import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { add, getMany, getOne, remove, update } from "../../services/CRUD";

import { ExtendedRequest } from "../../utils/Types/request/request";
import { addSlugAttribute } from "../../middlewares/slug";
import slugify from "slugify";

type ModelName = keyof typeof Prisma.ModelName;
const modelName: ModelName = "brand";

// Wrapper function for addBrand
export const addBrand = [addSlugAttribute("brand_name"), add(modelName)];

export const updateBrand = update(modelName);
export const deleteBrand = remove(modelName);
export const getBrand = getOne(modelName);
export const getPaginatedBrands = getMany(modelName);
