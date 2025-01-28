"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productController_1 = require("../../controllers/productController");
const productValidation_1 = require("../../utils/Validations/productValidation");
const express_1 = __importDefault(require("express"));
const verifyTokenWithOptionalRole_1 = require("../../middlewares/auth/verifyTokenWithOptionalRole");
const ProductRoute = express_1.default.Router();
// USER ROUTES for product
ProductRoute.post("/", (0, verifyTokenWithOptionalRole_1.isAuthenticated)("User"), productValidation_1.validateproduct, productController_1.addProduct);
// update a product and delete a product
ProductRoute.route("/:product_id")
    .delete((0, verifyTokenWithOptionalRole_1.isAuthenticated)(), productValidation_1.validateDeleteproduct, productController_1.deleteProduct)
    .put((0, verifyTokenWithOptionalRole_1.isAuthenticated)("User"), productValidation_1.validateproductUpdate, productController_1.updateProduct);
// USER & ADMIN ROUTES for product
// get all products
ProductRoute.get("/", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), productController_1.getPaginatedProducts);
// get a single product
ProductRoute.get("/:product_id", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), productController_1.getProduct);
// dele
exports.default = ProductRoute;
