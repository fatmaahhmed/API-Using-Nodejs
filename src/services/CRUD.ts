import { NextFunction, Response } from "express";
import { PrismaClient, product } from "@prisma/client";

import ApiError from "../utils/err/ApiErrorHandler";
import { ExtendedRequest } from "../utils/Types/request/request";
import asyncHandler from "express-async-handler";
import { handlePrismaError } from "../utils/err/handlePrismaerror";
import { prisma } from "../prisma/config/prismaConfig";
import { stringify } from "querystring";

type ModelName = keyof PrismaClient;
interface CrudOperations {
  create: (args: any) => Promise<any>;
  findUnique: (args: any) => Promise<any>;
  update: (args: any) => Promise<any>;
  delete: (args: any) => Promise<any>;
  findMany: (args: any) => Promise<any>;
  count: () => Promise<any>;
}
const getPrismaModel = <T extends ModelName>(modelName: T): CrudOperations => {
  return prisma[modelName] as CrudOperations;
};
const createCrudHandler = (
  modelName: ModelName,
  operation: "add" | "update" | "remove" | "getOne" | "getMany"
) => {
  return asyncHandler(
    async (req: ExtendedRequest, res: Response, next: NextFunction) => {
      const model = getPrismaModel(modelName);
      const idField = `${modelName.toString()}_id`;
      const userId = "user_id";
      let result: any;

      try {
        switch (operation) {
          case "add":
            const a = req.body;
            console.log(JSON.stringify(a));
            console.log(req.body);
            console.log(req.params.user_id);
            // console.log(modelName.toString());
            // console.log(model);

            result = await model.create({
              data: { ...req.body, [userId]: +req.params[userId] },
            });
            res.status(201).json({
              message: `${modelName.toString()} added successfully`,
              [modelName]: result,
              token: req.token,
            });
            break;
          case "update":
            const modelId = `${modelName.toString()}_id`;
            console.log("req.params[idField]", req.params[idField]);
            console.log("req.params[userId]", req.params[userId]);
            console.log("modelId", modelId);
            const modelData = await model.findUnique({
              where: {
                [idField]: +req.params[idField],
                user_id: +req.params[userId],
              },
            });
            if (!modelData) {
              next(new ApiError("Row not found", 404));
            }
            // update specific part of selected data in a variable
            const updatedFields = req.body;
            const updateData = {
              ...modelData,
              ...updatedFields,
            };
            console.log("updateData", JSON.stringify(updateData));
            result = await model.update({
              data: updateData,
              where: {
                [idField]: +req.params[idField],
                [userId]: +req.params[userId],
              },
            });
            if (!result) {
              next(new ApiError("Row not found", 404));
            }
            res.status(200).json({
              message: `${modelName.toString()} updated successfully`,
              [modelName]: result,
            });
            break;
          case "remove":
            console.log("req.params[idField]", req.params[idField]);
            console.log("req.params[userId]", req.params[userId]);
            const DeletedData = await model.findUnique({
              where: {
                [idField]: +req.params[idField],
                user_id: +req.params[userId],
              },
            });

            if (!DeletedData) {
              next(new ApiError("Row not found", 404));
              return;
            }
            result = await model.delete({
              where: {
                [idField]: +req.params[idField],
                user_id: +req.params[userId],
              },
            });

            res.status(200).json({
              message: `${modelName.toString()} deleted successfully`,
              [modelName]: result,
            });
            break;
          case "getOne":
            result = await model.findUnique({
              where: { [idField]: +req.params[idField] },
            });
            if (!result) {
              next(new ApiError("Row not found", 404));
            }
            res.status(200).json({ [modelName]: result });
            break;
          case "getMany":
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;
            console.log(page, pageSize);
            if (page < 1 || pageSize < 1) {
              res.status(400).json({ error: "Invalid page or pageSize value" });
            }
            const items = await model.findMany({
              skip: (page - 1) * pageSize,
              take: pageSize,
              orderBy: {
                [idField]: "asc",
              },
            });
            const totalItems = await model.count();
            const totalPages = Math.ceil(totalItems / pageSize);
            console.log(totalItems, totalPages);
            if (page > totalPages) {
              next(new ApiError("Page not found", 404));
            }
            res.status(200).json({
              page,
              pageSize,
              totalItems,
              totalPages: Math.ceil(totalItems / pageSize),
              modelName: items,
            });
            break;
        }
      } catch (error) {
        next(handlePrismaError(error));
      }
    }
  );
};
export const add = (modelName: ModelName) =>
  createCrudHandler(modelName, "add");
export const update = (modelName: ModelName) =>
  createCrudHandler(modelName, "update");
export const remove = (modelName: ModelName) =>
  createCrudHandler(modelName, "remove");
export const getOne = (modelName: ModelName) =>
  createCrudHandler(modelName, "getOne");
export const getMany = (modelName: ModelName) =>
  createCrudHandler(modelName, "getMany");
