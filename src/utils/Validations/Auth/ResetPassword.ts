// validateForgotpassword

import { body } from "express-validator/lib/middlewares/validation-chain-builders";
import { validationErrors } from "../../../middlewares/validation/validatorMiddleware";

export const validateResetPassword = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("code")
    .notEmpty()
    .withMessage("Code is required")
    .isNumeric()
    .withMessage("Code must be a number"),
  body("password")
    // .isStrongPassword()
    // .withMessage(`password invalid`)
    .notEmpty()
    .withMessage("Password is required"),
  validationErrors,
];
