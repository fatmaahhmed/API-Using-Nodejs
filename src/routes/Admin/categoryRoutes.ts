import {
  addCategory,
  deleteCategory,
  getCategory,
  getPaginatedCategories,
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
Category.use("/:category_id/subCategory/", getCategory);

Category.get("/:category_id/subCategory");
Category.get("/", getPaginatedCategories);
Category.get("/:category_id", getCategory);
Category.post(
  "/",
  validateCategory,
  verifyTokenWithOptionalRole("Admin"),
  addCategory
);
Category.route("/:category_id")
  .delete(
    validateDeleteCategory,
    verifyTokenWithOptionalRole("Admin"),
    deleteCategory
  )
  .put(
    validateCategoryUpdate,
    verifyTokenWithOptionalRole("Admin"),
    updateCategory
  );

export default Category;
