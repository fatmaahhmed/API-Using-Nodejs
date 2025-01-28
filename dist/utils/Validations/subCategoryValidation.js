"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateSubCategory = exports.validateDeleteSubCategory = exports.validateSubCategory = void 0;
const express_validator_1 = require("express-validator");
const ApiErrorHandler_1 = __importDefault(require("../err/ApiErrorHandler"));
const validatorMiddleware_1 = require("../../middlewares/validation/validatorMiddleware");
exports.validateSubCategory = [
    (0, express_validator_1.body)("category_name")
        .notEmpty()
        .withMessage("Category name is required")
        .isString()
        .withMessage("Category name must be a string"),
    (0, express_validator_1.body)("parent_id")
        .optional()
        .isInt()
        .withMessage("Parent ID must be an integer"),
    (0, express_validator_1.param)("user_id")
        .notEmpty()
        .withMessage("User ID is required")
        .isInt()
        .withMessage("User ID must be an integer"),
    validatorMiddleware_1.validationErrors,
];
exports.validateDeleteSubCategory = [
    (0, express_validator_1.body)().custom((value, { req }) => {
        if (Object.keys(req.body).length === 0) {
            throw new ApiErrorHandler_1.default("You must provide: subcategory_name or subcategory_id at least one", 400);
        }
        return true;
    }),
    (0, express_validator_1.body)("subcategory_name")
        .optional()
        .isString()
        .withMessage("Category name must be a string"),
    (0, express_validator_1.param)("category_id")
        .notEmpty()
        .withMessage("Category ID is required")
        .isInt()
        .withMessage("Category ID must be an integer"),
    (0, express_validator_1.param)("user_id")
        .notEmpty()
        .withMessage("User ID is required")
        .isInt()
        .withMessage("User ID must be an integer"),
    validatorMiddleware_1.validationErrors,
];
exports.validateUpdateSubCategory = [
    (0, express_validator_1.body)().custom((value, { req }) => {
        if (Object.keys(req.body).length === 0) {
            throw new ApiErrorHandler_1.default("You must provide: subcategory_name or subcategory_id at least one", 400);
        }
        return true;
    }),
    (0, express_validator_1.body)("subcategory_name")
        .optional()
        .isString()
        .withMessage("Category name must be a string"),
    (0, express_validator_1.body)("category_id")
        .optional()
        .isInt()
        .withMessage("Category ID must be an integer"),
    (0, express_validator_1.body)("parent_id")
        .optional()
        .isInt()
        .withMessage("Parent ID must be an integer"),
    (0, express_validator_1.param)("user_id")
        .notEmpty()
        .withMessage("User ID is required")
        .isInt()
        .withMessage("User ID must be an integer"),
    validatorMiddleware_1.validationErrors,
];
