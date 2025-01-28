"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const brandController_1 = require("../../controllers/brandController");
//  import { SubBrand } from "./Admin.SubBrand";
const express_1 = __importDefault(require("express"));
const verifyTokenWithOptionalRole_1 = require("../../middlewares/auth/verifyTokenWithOptionalRole");
// import {
//   validateBrand,
//   validateBrandUpdate,
//   validateDeleteBrand,
// } from "../../utils/Validations/AdminValidation/Admin.Brand";
const brand = express_1.default.Router();
// Brand.use("/:Brand_id/subBrand/", getBrand);
brand.get("/:brand_id", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), brandController_1.getBrand);
brand.get("/", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), brandController_1.getPaginatedBrands);
brand.post("/", 
// validateBrand,
(0, verifyTokenWithOptionalRole_1.isAuthenticated)("Admin"), brandController_1.addBrand);
brand
    .route("/:brand_id")
    .delete(
// validateDeleteBrand,
(0, verifyTokenWithOptionalRole_1.isAuthenticated)("Admin"), brandController_1.deleteBrand)
    .put(
// validateBrandUpdate,
(0, verifyTokenWithOptionalRole_1.isAuthenticated)("Admin"), brandController_1.updateBrand);
exports.default = brand;
