import { body, param, validationResult } from "express-validator";

import { validationErrors } from "../../../middlewares/validation/validatorMiddleware";

export const validateDeleteSubCategory = [
  body("subcategory_name")
    .notEmpty()
    .isString()
    .withMessage("Category name must be a string"),
  body("parent_id")
    .notEmpty()
    .isInt()
    .withMessage("parent_id  must be a number"),
  param("category_id")
    .notEmpty()
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
  // Validate category_name
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
  ,
  param("user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt()
    .withMessage("User ID must be an integer"),
  validationErrors,
];
export const validateSubCategory = [
  // Validate category_name
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
  validationErrors,
];
// export const validateSubCategory = [
//   // Validate category_name
//   body("category_name")
//     .notEmpty()
//     .withMessage("Category name is required")
//     .isString()
//     .withMessage("Category name must be a string"),

//   // Validate parent_id (optional)
//   body("parent_id")
//     .optional()
//     .isInt()
//     .withMessage("Parent ID must be an integer"),

//   // Validate user_id (from params)
//   param("user_id")
//     .notEmpty()
//     .withMessage("User ID is required")
//     .isInt()
//     .withMessage("User ID must be an integer"),
//   validationErrors,
// ];
