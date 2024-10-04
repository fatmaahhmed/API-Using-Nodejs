import { body, param, validationResult } from "express-validator";

import { validationErrors } from "../../../middlewares/validation/validatorMiddleware";

export const validateSignUp = [
  // Validate category_name
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  // Validate parent_id (optional)
  //Admin@123
  body("password")
    .isStrongPassword()
    .withMessage(`password invalid`)
    .notEmpty()
    .withMessage("Password is required"),
  validationErrors,
];
