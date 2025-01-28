"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteproduct = exports.validateproductUpdate = exports.validateproduct = void 0;
const express_validator_1 = require("express-validator");
const prismaConfig_1 = require("../../prisma/config/prismaConfig");
const validatorMiddleware_1 = require("../../middlewares/validation/validatorMiddleware");
//   product_name    String     @unique
//  quantity        Int        @default(0)
//   description     String
//   price           Float
// discount_price  Float?
// category_id     Int?
// user_id         Int
// color           String?
exports.validateproduct = [
    // Validate product_name
    (0, express_validator_1.body)("product_name")
        .notEmpty()
        .withMessage("product name is required")
        .isString()
        .withMessage("product name must be a string"),
    //  "brand_name"
    (0, express_validator_1.body)("quantity")
        .notEmpty()
        .withMessage("quantity is required")
        .isInt()
        .withMessage("quantity must be an integer"),
    (0, express_validator_1.body)("description")
        .optional()
        .isString()
        .withMessage("description must be a string"),
    (0, express_validator_1.body)("price")
        .notEmpty()
        .withMessage("price is required")
        .isFloat()
        .withMessage("price must be a float"),
    (0, express_validator_1.body)("discount_price")
        .optional()
        .custom((value, { req }) => {
        console.log("value", value);
        console.log("req.body.discount_price", req.body.discount_price);
        if (value > req.body.price) {
            throw new Error("discount_price must be less than price");
        }
        return true; // Important: return true if validation passes
    }),
    (0, express_validator_1.body)("category_id")
        .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        const category = yield prismaConfig_1.prisma.category.findFirst({
            where: {
                category_id: value,
            },
        });
        if (!category) {
            throw new Error("Category not found");
        }
        return true; // Important: return true if validation passes
    }))
        .notEmpty()
        .withMessage("category_id is required"),
    (0, express_validator_1.body)("color").optional().isString().withMessage("color must be a string"),
    (0, express_validator_1.param)("user_id")
        .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        var _b;
        const user_id = (_b = req.params) === null || _b === void 0 ? void 0 : _b.user_id; // Accessing req correctly
        const user = yield prismaConfig_1.prisma.user.findFirst({
            where: {
                user_id: value,
            },
        });
        if (!user) {
            throw new Error("User not found in the database");
        }
        return true; // Important: return true if validation
    }))
        .notEmpty()
        .withMessage("User ID is required")
        .isInt()
        .withMessage("User ID must be an integer"),
    validatorMiddleware_1.validationErrors,
];
exports.validateproductUpdate = [
    (0, express_validator_1.body)("product_name")
        .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        var _b;
        const user_id = (_b = req.params) === null || _b === void 0 ? void 0 : _b.user.id; // Accessing req correctly
        const product = yield prismaConfig_1.prisma.product.findFirst({
            where: {
                product_name: value,
                user_id: user_id, // Use the correct user_id from req
            },
        });
        if (!product) {
            throw new Error("Product not found in the database");
        }
        return true; // Important: return true if validation passes
    }))
        .notEmpty()
        .isString()
        .withMessage("product name must be a string"),
    (0, express_validator_1.body)("discount_price")
        .optional()
        .custom((value, { req }) => {
        if (value > req.body.discount_price) {
            throw new Error("discount_price must be less than price");
        }
        return true; // Important: return true if validation passes
    }),
    (0, express_validator_1.param)("product_id")
        .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        var _b;
        const user_id = (_b = req.params) === null || _b === void 0 ? void 0 : _b.user.id; // Accessing req correctly
        const product = yield prismaConfig_1.prisma.product.findFirst({
            where: {
                product_id: value,
                user_id: user_id, // Use the correct user_id from req
            },
        });
        if (!product) {
            throw new Error("Product not found in the database");
        }
        return true; // Important: return true if validation passes
    }))
        .notEmpty()
        .withMessage("product_id is required")
        .isInt()
        .withMessage("product_id must be an integer"),
    (0, express_validator_1.param)("user_id")
        .notEmpty()
        .withMessage("user_id is required")
        .isInt()
        .withMessage("user_id must be an integer"),
    validatorMiddleware_1.validationErrors,
];
exports.validateDeleteproduct = [
    (0, express_validator_1.body)("product_name")
        .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        var _b;
        const user_id = (_b = req.params) === null || _b === void 0 ? void 0 : _b.user.id; // Accessing req correctly
        const product = yield prismaConfig_1.prisma.product.findFirst({
            where: {
                product_name: value,
                user_id: user_id, // Use the correct user_id from req
            },
        });
    }))
        .optional()
        .isString()
        .withMessage("product name must be a string"),
    (0, express_validator_1.param)("product_id")
        .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        var _b;
        const user_id = (_b = req.params) === null || _b === void 0 ? void 0 : _b.user.id; // Accessing req correctly
        const product = yield prismaConfig_1.prisma.product.findFirst({
            where: {
                product_id: value,
                user_id: user_id, // Use the correct user_id from req
            },
        });
        if (!product) {
            throw new Error("Product not found in the database");
        }
        return true; // Important: return true if validation passes
    }))
        .notEmpty()
        .withMessage("product_id is required")
        .isInt()
        .withMessage("product_id must be an integer"),
    (0, express_validator_1.param)("user_id")
        .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        var _b;
        const user_id = (_b = req.params) === null || _b === void 0 ? void 0 : _b.user.id; // Accessing req correctly
        const user = yield prismaConfig_1.prisma.user.findFirst({
            where: {
                user_id: value,
            },
        });
        if (!user) {
            throw new Error("User not found in the database");
        }
        return true; // Important: return true if validation
    }))
        .notEmpty()
        .withMessage("user_id is required")
        .isInt()
        .withMessage("user_id must be an integer"),
    validatorMiddleware_1.validationErrors,
];
