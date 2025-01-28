"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryController_1 = require("../../controllers/categoryController");
const categoryValidation_1 = require("../../utils/Validations/categoryValidation");
//  import { SubCategory } from "./Admin.SubCategory";
const express_1 = __importDefault(require("express"));
const verifyTokenWithOptionalRole_1 = require("../../middlewares/auth/verifyTokenWithOptionalRole");
const Category = express_1.default.Router();
// Category.use("/:category_id/subCategory/", getCategory);
Category.use((0, verifyTokenWithOptionalRole_1.isAuthenticated)("Admin"));
Category.get("/:category_id/subCategory", categoryController_1.getPaginatedCategoriesWithSubCategories);
Category.get("/", categoryController_1.getPaginatedCategories);
Category.get("/:category_id", categoryController_1.getCategory);
Category.post("/", (0, verifyTokenWithOptionalRole_1.isAuthenticated)("Admin"), categoryValidation_1.validateCategory, categoryController_1.addCategory);
Category.route("/:category_id")
    .delete((0, verifyTokenWithOptionalRole_1.isAuthenticated)("Admin"), categoryValidation_1.validateDeleteCategory, categoryController_1.deleteCategory)
    .put((0, verifyTokenWithOptionalRole_1.isAuthenticated)("Admin"), categoryValidation_1.validateCategoryUpdate, categoryController_1.updateCategory);
exports.default = Category;
