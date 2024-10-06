import {
  addCategory,
  deleteCategory,
  getCategory,
  getPaginatedCategories,
  getPaginatedCategoriesWithSubCategories,
  updateCategory,
} from "../../controllers/admin/categoryController";
import {
  validateCategory,
  validateCategoryUpdate,
  validateDeleteCategory,
} from "../../utils/Validations/AdminValidation/Admin.Category";

import SubCategoryRoute from "./subCategoryRoutes";
//  import { SubCategory } from "./Admin.SubCategory";
import express from "express";
import { verifyTokenWithOptionalRole } from "../../middlewares/auth/verifyTokenWithOptionalRole";

const Category = express.Router();
// Category.use("/:category_id/subCategory/", getCategory);

Category.get(
  "/:category_id/subCategory",
  getPaginatedCategoriesWithSubCategories
);
Category.get("/", getPaginatedCategories);
Category.get("/:category_id", getCategory);
Category.post(
  "/",
  verifyTokenWithOptionalRole("Admin"),
  validateCategory,
  addCategory
);
Category.route("/:category_id")
  .delete(
    verifyTokenWithOptionalRole("Admin"),
    validateDeleteCategory,
    deleteCategory
  )
  .put(
    verifyTokenWithOptionalRole("Admin"),
    validateCategoryUpdate,
    updateCategory
  );

export default Category;
