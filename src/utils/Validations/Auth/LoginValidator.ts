import { body, param, validationResult } from "express-validator";

import { validationErrors } from "../../../middlewares/validation/validatorMiddleware";

export const validateLogin = [
  // Validate category_name
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("password")
    // .isStrongPassword()
    // .withMessage(
    //   `Password must be strong consisting of at least8 characters,1 lowercase letter, 1 uppercase letter, 1 number,and 1 special characterlike Admin@123`
    // )
    .notEmpty()
    .withMessage("Password is required"),
  validationErrors,
];
