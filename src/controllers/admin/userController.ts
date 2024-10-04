import { Prisma, PrismaClient, user } from "@prisma/client";
import { add, getMany, getOne, remove, update } from "../../services/CRUD";

import { signUp } from "../auth/1-signup";

type ModelName = keyof typeof Prisma.ModelName;
const prisma = new PrismaClient();
const modelName: ModelName = "user";
export const addUser = signUp;
export const updateUser = update(modelName);
export const deleteUser = remove(modelName);
export const getUser = getOne(modelName);
export const getPaginatedUsers = getMany(modelName);
