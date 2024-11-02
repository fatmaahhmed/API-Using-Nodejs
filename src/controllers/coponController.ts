import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { add, getMany, getOne, remove, update } from "../services/CRUD";

import { ExtendedRequest } from "../utils/Types/request/request";
import { addSlugAttribute } from "../middlewares/slug";
import slugify from "slugify";

type ModelName = keyof typeof Prisma.ModelName;
const modelName: ModelName = "copon";

// Wrapper function for addCopon
export const addCopon = [addSlugAttribute("copon_name"), add(modelName)];

export const updateCopon = update(modelName);
export const deleteCopon = remove(modelName);
export const getCopon = getOne(modelName);
export const getPaginatedCopons = getMany(modelName);
