import { Prisma, PrismaClient } from "@prisma/client";
import { add, getMany, getOne, remove, update } from "../../services/CRUD";

import ApiError from "../../utils/err/ApiErrorHandler";
import asyncHandler from "express-async-handler";
import { handlePrismaError } from "../../utils/err/handlePrismaerror";

type ModelName = keyof typeof Prisma.ModelName;
const prisma = new PrismaClient();
const modelName: ModelName = "category";
export const addCategory = add(modelName);
export const updateCategory = update(modelName);
export const deleteCategory = remove(modelName);
export const getCategory = asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.category_id, 10);
  let category: {
    where: { category_id: number; parent_id: null };
    select: { [key: string]: any };
  } = {
    where: {
      category_id: id,
      parent_id: null,
    },
    select: {
      category_id: true,
      category_name: true,
    },
  };
  const k = req.originalUrl.split("/")[4];
  console.log(`origin: ${req.originalUrl.split("/")[4]}`);

  if (k === "subCategory") {
    category.select["childCategories"] = {
      select: {
        category_name: true,
        category_id: true,
      },
    };
  }
  try {
    const categories = await prisma.category.findUnique(category);
    if (!categories) {
      next(
        new ApiError(
          "Category not found ! OR you must enter ID of main category :)",
          404
        )
      );
    }
    res.status(200).json({ categories });
  } catch (err) {
    next(handlePrismaError(err));
  }
});
// getOne(modelName);
export const getPaginatedCategories = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  if (page < 1 || pageSize < 1) {
    res.status(400).json({ error: "Invalid page or pageSize value" });
  }
  const parentCategories = await prisma.category
    .findMany({
      where: {
        parent_id: null,
      },
      select: {
        category_id: true,
        category_name: true,
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
  // i need to count category where parent_id is null
  const totalItems = await prisma.category.count({
    where: {
      parent_id: null,
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
    category: parentCategories,
  });
});
export const getPaginatedCategoriesWithSubCategories = asyncHandler(
  async (req, res, next) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    if (page < 1 || pageSize < 1) {
      res.status(400).json({ error: "Invalid page or pageSize value" });
    }
    const parentCategories = await prisma.category
      .findMany({
        where: {
          parent_id: null,
        },
        select: {
          category_id: true,
          category_name: true,
          childCategories: {
            select: {
              category_id: true,
              category_name: true,
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
    // i need to count category where parent_id is null
    const totalItems = await prisma.category.count({
      where: {
        parent_id: null,
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
      category: parentCategories,
    });
  }
);

// getMany(modelName);
// filter categories by
// await prisma.category
//   .findUnique({
//     where: { category_id: id },
//     select: {
//       category_id: true,
//       category_name: true,
//       childCategories: {
//         select: {
//           category_name: true,
//           category_id: true,
//         },
//       },
//     },
//   })
// childCategories: {
//   select: {
//     category_id: true,
//     category_name: true,
//     childCategories: {
//       select: {
//         category_id: true,
//         category_name: true,
//         childCategories: {
//           select: {
//             category_id: true,
//             category_name: true,
//           },
//         },
//       },
//     },
//   },
// },
