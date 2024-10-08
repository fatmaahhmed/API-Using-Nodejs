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
import { isAuthenticated } from "../../middlewares/auth/verifyTokenWithOptionalRole";

const Category = express.Router();
// Category.use("/:category_id/subCategory/", getCategory);

Category.get(
  "/:category_id/subCategory",
  getPaginatedCategoriesWithSubCategories
);
Category.get("/", getPaginatedCategories);
Category.get("/:category_id", getCategory);
Category.post("/", isAuthenticated("Admin"), validateCategory, addCategory);
Category.route("/:category_id")
  .delete(isAuthenticated("Admin"), validateDeleteCategory, deleteCategory)
  .put(isAuthenticated("Admin"), validateCategoryUpdate, updateCategory);

export default Category;
