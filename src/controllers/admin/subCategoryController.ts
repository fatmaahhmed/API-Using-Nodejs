import { Prisma, PrismaClient, category } from "@prisma/client";
import { add, getMany, getOne, remove, update } from "../../services/CRUD";

import ApiError from "../../utils/err/ApiErrorHandler";
import { addSlugAttribute } from "../../middlewares/slug";
import asyncHandler from "express-async-handler";
import { getCategory } from "./categoryController";
import { handlePrismaError } from "../../utils/err/handlePrismaerror";
import { prisma } from "../../prisma/config/prismaConfig";

type ModelName = keyof typeof Prisma.ModelName;

const modelName: ModelName = "category";
export const check_parent_id_existence = asyncHandler(
  async (req, res, next) => {
    const { parent_id } = req.body;
    const category = await prisma.category.findUnique({
      where: {
        category_id: parent_id,
      },
    });
    if (!category) {
      next(
        new ApiError(
          "Category parent not found ,insert valid ->parent_id<- number",
          404
        )
      );
      return;
    }
    next();
  }
);
export const addSubCategory = [
  addSlugAttribute("category_name"),
  add(modelName),
];
export const updateSubCategory = update(modelName);
export const deleteSubCategory = remove(modelName);
export const getSubCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.category_id;
  console.log(`id: ${id}`);
  const parentCategories = await prisma.category
    .findMany({
      where: {
        category_id: +id,
      },
      select: {
        category_id: true,
        category_name: true,
        // parentCategory: { select: { category_name: true, category_id: true } },
        childCategories: {
          select: {
            category_name: true,
            category_id: true,
          },
        },
      },
    })
    .catch((err) => {
      next(handlePrismaError(err));
    });
  const totalItems = await prisma.category.count();

  res.status(200).json({ SubCategory: parentCategories });
});
export const getPaginatedCategories = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  if (page < 1 || pageSize < 1) {
    res.status(400).json({ error: "Invalid page or pageSize value" });
  }
  const parentCategories = await prisma.category
    .findMany({
      where: {
        parent_id: { not: null },
      },
      select: {
        category_id: true,
        category_name: true,
        parentCategory: {
          select: {
            category_name: true,
            category_id: true,
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        category_id: "asc",
      },
    })
    .catch((err) => {
      next(handlePrismaError(err));
    });
  const totalItems = await prisma.category.count({
    where: {
      parent_id: { not: null },
    },
  });
  const totalPages = Math.ceil(totalItems / pageSize);
  console.log(totalItems, totalPages);
  if (page > totalPages) {
    next(new ApiError("Page not found", 404));
  }
  res.status(200).json({
    page,
    pageSize,
    totalItems,
    totalPages,
    SubCategory: parentCategories,
  });
});

// filter categories by
