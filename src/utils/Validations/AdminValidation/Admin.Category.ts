import { body, param, validationResult } from "express-validator";

import ApiError from "../../err/ApiErrorHandler";
import { validationErrors } from "../../../middlewares/validation/validatorMiddleware";

export const validateCategory = [
  // Validate category_name
  body("category_name")
    .notEmpty()
    .withMessage("Category name is required")
    .isString()
    .withMessage("Category name must be a string"),
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

export const validateCategoryUpdate = [
  // request body validation
  body().custom((value, { req }) => {
    console.log("Object.keys(req.body).length", Object.keys(req.body).length);
    if (Object.keys(req.body).length == 0) {
      const z = 1;
      throw new ApiError(
        "You must provide : category_name or category_id at least one",
        400
      );
    }
    return true;
  }),
  body("category_name")
    .optional()
    .isString()
    .withMessage("Category name must be a string"),
  body("category_id")
    .optional()
    .isInt()
    .withMessage("categoryId must be an integer"),
  param("user_id")
    .notEmpty()
    .withMessage("user_id is required")
    .isInt()
    .withMessage("user_id must be an integer"),
  validationErrors,
];

export const validateDeleteCategory = [
  // request body validation
  body().custom((value, { req }) => {
    if (Object.keys(req.body).length < 0) {
      new ApiError(
        "You must provide : category_name or category_id at least one",
        400
      );
    }
    return true;
  }),
  body("category_name")
    .optional()
    .isString()
    .withMessage("Category name must be a string"),
  param("category_id")
    .optional()
    .isInt()
    .withMessage("categoryId must be an integer"),
  param("user_id")
    .notEmpty()
    .withMessage("user_id is required")
    .isInt()
    .withMessage("user_id must be an integer"),
  validationErrors,
];
