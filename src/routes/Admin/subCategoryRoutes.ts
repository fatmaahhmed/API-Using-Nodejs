import {} from "../../controllers/admin/subCategoryController";

import {
  addSubCategory,
  check_parent_id_existence,
  deleteSubCategory,
  getPaginatedCategories,
  getSubCategory,
  updateSubCategory,
} from "../../controllers/admin/subCategoryController";
import {
  validateDeleteSubCategory,
  validateSubCategory,
} from "../../utils/Validations/AdminValidation/Admin.SubCategory";

import { check } from "express-validator";
//  import { SubSubCategory } from "./Admin.SubSubCategory";
import express from "express";
import { verifyTokenWithOptionalRole } from "../../middlewares/auth/verifyTokenWithOptionalRole";

const SubCategoryRoute = express.Router();
// SubCategory.use("/:SubCategory_id/sub/", SubSubCategory);

SubCategoryRoute.get("/:subcategory_id", getSubCategory);
SubCategoryRoute.get("/", getPaginatedCategories);
SubCategoryRoute.get("/:SubCategory_id", getSubCategory);
SubCategoryRoute.post(
  "/",
  verifyTokenWithOptionalRole("Admin"),
  validateSubCategory,
  check_parent_id_existence,
  addSubCategory
);
SubCategoryRoute.route("/:SubCategory_id")
  .delete(
    verifyTokenWithOptionalRole("Admin"),
    validateDeleteSubCategory,
    deleteSubCategory
  )
  .put(
    // validateSubCategoryUpdate,
    verifyTokenWithOptionalRole("Admin"),
    updateSubCategory
  );

export default SubCategoryRoute;
