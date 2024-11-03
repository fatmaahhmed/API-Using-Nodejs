import { NextFunction, Response } from "express";

import ApiError from "../utils/err/ApiErrorHandler";
import { ExtendedRequest } from "../utils/Types/request/request";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import { handlePrismaError } from "../utils/err/handlePrismaerror";
import { prisma } from "../prisma/config/prismaConfig";
import { stringify } from "querystring";
import { where } from "sequelize";

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
      const user_id = +req.params.user_id;
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
              data: { ...req.body, user_id: user_id },
            });
            res.status(201).json({
              message: `${modelName.toString()} added successfully`,
              [modelName]: result,
              token: req.token,
            });
            break;
          case "update":
            const model_id = `${modelName.toString()}_id`;
            console.log("req.params[idField]", req.params[idField]);
            console.log("model_id", model_id);
            const modelData = await model.findUnique({
              where: {
                [idField]: +req.params[idField],
                user_id: user_id,
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
                user_id: user_id,
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
            console.log("user_id: user_id", user_id);
            const DeletedData = await model.findUnique({
              where: {
                [idField]: +req.params[idField],
                user_id: user_id,
              },
            });

            if (!DeletedData) {
              next(new ApiError("Row not found", 404));
              return;
            }
            result = await model.delete({
              where: {
                [idField]: +req.params[idField],
                user_id: user_id,
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
            // TODO: add pagination
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;
            console.log(page, pageSize);
            if (page < 1 || pageSize < 1) {
              res.status(400).json({ error: "Invalid page or pageSize value" });
            }
            // TODO:add filtration
            const filterObject = { ...req.query } as any;
            delete filterObject.page;
            delete filterObject.pageSize;
            console.log("filterObject", filterObject);
            // make value of filterObject to be number
            for (const key in filterObject) {
              console.log("key", key);
              if (filterObject.hasOwnProperty(key)) {
                const value = filterObject[key];
                if (typeof value === "string" && !isNaN(+value)) {
                  filterObject[key] = +value;
                  console.log("filterObject[key]", filterObject[key]);
                }
              }
            }
            console.log("filterObject", filterObject);
            const filters: any = {};
            if (filterObject.minRating) {
              filters.rating = { gte: filterObject.minRating };
            }
            if (filterObject.maxRating) {
              filters.rating = { lte: filterObject.maxRating };
            }
            if (filterObject.minPrice) {
              filters.price = { gte: filterObject.minPrice };
            }
            if (filterObject.maxPrice) {
              filters.price = { lte: filterObject.maxPrice };
            }
            if (filterObject.minRating) {
              filters.rating = { gte: filterObject.minRating };
            }
            if (filterObject.maxRating) {
              filters.rating = { lte: filterObject.maxRating };
            }
            // brand
            if (filterObject.brand_name) {
              filters.brand_name = filterObject.brand_name;
            }
            // category
            if (filterObject.category) {
              filters.category_id = filterObject.category;
            }
            // color
            if (filterObject.color) {
              filters.color = filterObject.color;
            }
            // stock
            if (filterObject.in_stock) {
              filters.in_stock = filterObject.in_stock
                ? Boolean(1)
                : Boolean(0);
            }
            console.log("filters", filters);
            // TODO: add sorting

            let sort = req.query.sort as any;
            console.log("sort", req.query.sort);
            let sortFields: any = {};
            if (sort) {
              sort = sort.split(",");
              console.log("sort", sort);
            }

            if (sort && sort[0].startsWith("-")) {
              // remove - from sort[0]
              sort[0] = sort[0].substring(1);
              console.log("sort -");
              for (const s of sort) {
                sortFields[s] = "desc";
              }
              // make this array of objects
              sort = {
                [sort[0]]: "desc",
              };
            } else {
              console.log("sort +");
              sort = {
                [sort.substring(1)]: "des",
              };
            }
            console.log("sort", sort);
            // TODO: add fields
            let fields = req.query.fields as any;

            const items = await model.findMany({
              where: {
                ...filters,
              },
              skip: (page - 1) * pageSize,
              take: pageSize,
              orderBy: {
                // [idField]: "asc",
                ...sortFields,
              },
            });

            // TODO: add sorting

            // TODO: add search
            // TODO: add select
            // TODO: add include
            // TODO: add aggregate
            // TODO: add groupBy
            // TODO: add having
            //

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
        // log field which may cause error
        console.log("error----------------------", error);

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
