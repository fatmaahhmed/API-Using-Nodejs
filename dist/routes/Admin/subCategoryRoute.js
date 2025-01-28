"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subCategoryController_1 = require("../../controllers/subCategoryController");
const subCategoryValidation_1 = require("../../utils/Validations/subCategoryValidation");
// import { check } from "express-validator";
//  import { SubSubCategory } from "./Admin.SubSubCategory";
const express_1 = __importDefault(require("express"));
const verifyTokenWithOptionalRole_1 = require("../../middlewares/auth/verifyTokenWithOptionalRole");
const SubCategoryRoute = express_1.default.Router();
// SubCategory.use("/:category_id/sub/", SubSubCategory);
SubCategoryRoute.get("/:category_id", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), subCategoryController_1.getSubCategory);
SubCategoryRoute.get("/", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), subCategoryController_1.getPaginatedCategories);
SubCategoryRoute.get("/:category_id", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), subCategoryController_1.getSubCategory);
SubCategoryRoute.post("/", (0, verifyTokenWithOptionalRole_1.isAuthenticated)("Admin"), subCategoryValidation_1.validateSubCategory, subCategoryController_1.check_parent_id_existence, subCategoryController_1.addSubCategory);
SubCategoryRoute.route("/:category_id")
    .delete((0, verifyTokenWithOptionalRole_1.isAuthenticated)("Admin"), subCategoryValidation_1.validateDeleteSubCategory, subCategoryController_1.deleteSubCategory)
    .put(subCategoryValidation_1.validateUpdateSubCategory, (0, verifyTokenWithOptionalRole_1.isAuthenticated)("Admin"), subCategoryController_1.updateSubCategory);
exports.default = SubCategoryRoute;
