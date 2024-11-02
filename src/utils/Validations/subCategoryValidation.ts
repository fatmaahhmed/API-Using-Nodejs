import { body, param } from "express-validator";

import ApiError from "../err/ApiErrorHandler";
import { validationErrors } from "../../middlewares/validation/validatorMiddleware";

export const validateSubCategory = [
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

export const validateDeleteSubCategory = [
  body().custom((value, { req }) => {
    if (Object.keys(req.body).length === 0) {
      throw new ApiError(
        "You must provide: subcategory_name or subcategory_id at least one",
        400
      );
    }
    return true;
  }),

  body("subcategory_name")
    .optional()
    .isString()
    .withMessage("Category name must be a string"),

  param("category_id")
    .notEmpty()
    .withMessage("Category ID is required")
    .isInt()
    .withMessage("Category ID must be an integer"),

  param("user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt()
    .withMessage("User ID must be an integer"),

  validationErrors,
];

export const validateUpdateSubCategory = [
  body().custom((value, { req }) => {
    if (Object.keys(req.body).length === 0) {
      throw new ApiError(
        "You must provide: subcategory_name or subcategory_id at least one",
        400
      );
    }
    return true;
  }),
  body("subcategory_name")
    .optional()
    .isString()
    .withMessage("Category name must be a string"),
  body("category_id")
    .optional()
    .isInt()
    .withMessage("Category ID must be an integer"),
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
