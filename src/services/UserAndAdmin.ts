import { NextFunction, Response } from "express";

import ApiError from "../utils/err/ApiErrorHandler";
import { PrismaClient } from "@prisma/client";
import { handlePrismaError } from "../utils/err/handlePrismaerror";

const prisma = new PrismaClient();
type ModelName = keyof PrismaClient;
export const findUserByEmail = async (email: string) => {
  const user = await prisma.user
    .findUnique({
      where: { email },
    })
    .catch((err) => {
      handlePrismaError(err);
    });
  return user;
}; /**1727330293677 */
export const updateUser = async (userId: number, data: any) => {
  const user = await prisma.user
    .update({
      where: { user_id: userId },
      data,
    })
    .catch((err) => {
      handlePrismaError(err);
    });
  return user;
};
