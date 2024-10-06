import { body, param, validationResult } from "express-validator";

import ApiError from "../../err/ApiErrorHandler";
import { validationErrors } from "../../../middlewares/validation/validatorMiddleware";

export const validateSubCategory = [
  body("subcategory_name")
    .notEmpty()
    .withMessage("Category name is required")
    .isString()
    .withMessage("Category name must be a string"),
  // Validate parent_id (optional)
  body("category_id")
    .notEmpty()
    .withMessage("Parent ID is required")
    .isInt()
    .withMessage("Parent ID must be an integer"),
  body("parent_id")
    .optional()
    .isInt()
    .withMessage("Parent ID must be an integer"),
  param("user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt()
    .withMessage("User ID must be an integer"),
  // validationErrors,
];

export const validateDeleteSubCategory = [
  // request body validation
  body().custom((value, { req }) => {
    if (Object.keys(req.body).length < 0) {
      new ApiError(
        "You must provide : subcategory_name or subcategory_id at least one",
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
    .withMessage("categoryId is required")
    .isInt()
    .withMessage("categoryId must be an integer"),
  param("user_id")
    .notEmpty()
    .withMessage("user_id is required")
    .isInt()
    .withMessage("user_id must be an integer"),
  validationErrors,
];
export const validateUpdateSubCategory = [
  // request body validation
  body().custom((value, { req }) => {
    if (Object.keys(req.body).length < 0) {
      new ApiError(
        "You must provide : subcategory_name or subcategory_id at least one",
        400
      );
    }
    return true;
  }),
  // Validate category_name
  body("category_name")
    .optional()
    .isString()
    .withMessage("Category name must be a string"),
  // Validate parent_id (optional)
  body("category_id").isInt().withMessage("Parent ID must be an integer"),
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
