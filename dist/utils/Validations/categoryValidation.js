"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteCategory = exports.validateCategoryUpdate = exports.validateCategory = void 0;
const express_validator_1 = require("express-validator");
const ApiErrorHandler_1 = __importDefault(require("../err/ApiErrorHandler"));
const validatorMiddleware_1 = require("../../middlewares/validation/validatorMiddleware");
exports.validateCategory = [
    // Validate category_name
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
exports.validateCategoryUpdate = [
    // request body validation
    (0, express_validator_1.body)().custom((value, { req }) => {
        console.log("Object.keys(req.body).length", Object.keys(req.body).length);
        if (Object.keys(req.body).length == 0) {
            const z = 1;
            throw new ApiErrorHandler_1.default("You must provide : category_name or category_id at least one", 400);
        }
        return true;
    }),
    (0, express_validator_1.body)("category_name")
        .optional()
        .isString()
        .withMessage("Category name must be a string"),
    (0, express_validator_1.body)("category_id")
        .optional()
        .isInt()
        .withMessage("categoryId must be an integer"),
    (0, express_validator_1.param)("user_id")
        .notEmpty()
        .withMessage("user_id is required")
        .isInt()
        .withMessage("user_id must be an integer"),
    validatorMiddleware_1.validationErrors,
];
exports.validateDeleteCategory = [
    // request body validation
    (0, express_validator_1.body)().custom((value, { req }) => {
        if (Object.keys(req.body).length < 0) {
            new ApiErrorHandler_1.default("You must provide : category_name or category_id at least one", 400);
        }
        return true;
    }),
    (0, express_validator_1.body)("category_name")
        .optional()
        .isString()
        .withMessage("Category name must be a string"),
    (0, express_validator_1.param)("category_id")
        .optional()
        .isInt()
        .withMessage("categoryId must be an integer"),
    (0, express_validator_1.param)("user_id")
        .notEmpty()
        .withMessage("user_id is required")
        .isInt()
        .withMessage("user_id must be an integer"),
    validatorMiddleware_1.validationErrors,
];
