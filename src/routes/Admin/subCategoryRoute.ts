import {} from "../../controllers/subCategoryController";

import {
  addSubCategory,
  check_parent_id_existence,
  deleteSubCategory,
  getPaginatedCategories,
  getSubCategory,
  updateSubCategory,
} from "../../controllers/subCategoryController";
import {
  validateDeleteSubCategory,
  validateSubCategory,
  validateUpdateSubCategory,
} from "../../utils/Validations/subCategoryValidation";

// import { check } from "express-validator";
//  import { SubSubCategory } from "./Admin.SubSubCategory";
import express from "express";
import { isAuthenticated } from "../../middlewares/auth/verifyTokenWithOptionalRole";

const SubCategoryRoute = express.Router();
// SubCategory.use("/:category_id/sub/", SubSubCategory);

SubCategoryRoute.get("/:category_id", isAuthenticated(), getSubCategory);
SubCategoryRoute.get("/", isAuthenticated(), getPaginatedCategories);
SubCategoryRoute.get("/:category_id", isAuthenticated(), getSubCategory);
SubCategoryRoute.post(
  "/",
  isAuthenticated("Admin"),
  validateSubCategory,

  check_parent_id_existence,
  addSubCategory
);
SubCategoryRoute.route("/:category_id")
  .delete(
    isAuthenticated("Admin"),
    validateDeleteSubCategory,
    deleteSubCategory
  )
  .put(validateUpdateSubCategory, isAuthenticated("Admin"), updateSubCategory);

export default SubCategoryRoute;
