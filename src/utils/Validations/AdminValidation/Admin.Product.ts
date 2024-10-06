import { body, param, validationResult } from "express-validator";

import { validationErrors } from "../../../middlewares/validation/validatorMiddleware";

export const validateproduct = [
  // Validate product_name
  body("product_name")
    .notEmpty()
    .withMessage("product name is required")
    .isString()
    .withMessage("product name must be a string"),
  body("parent_id")
    .optional()
    .isInt()
    .withMessage("Parent ID must be an integer"),
  param("user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt()
    .withMessage("User ID must be an integer"),
  validationErrors,
];

export const validateproductUpdate = [
  body("product_name")
    .notEmpty()
    .isString()
    .withMessage("product name must be a string"),
  param("productId")
    .notEmpty()
    .withMessage("productId is required")
    .isInt()
    .withMessage("productId must be an integer"),
  param("user_id")
    .notEmpty()
    .withMessage("user_id is required")
    .isInt()
    .withMessage("user_id must be an integer"),
  validationErrors,
];

export const validateDeleteproduct = [
  body("product_name")
    .notEmpty()
    .isString()
    .withMessage("product name must be a string"),
  param("productId")
    .notEmpty()
    .withMessage("productId is required")
    .isInt()
    .withMessage("productId must be an integer"),
  param("user_id")
    .notEmpty()
    .withMessage("user_id is required")
    .isInt()
    .withMessage("user_id must be an integer"),
  validationErrors,
];
