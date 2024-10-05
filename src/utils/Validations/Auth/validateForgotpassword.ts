// validateForgotpassword

import { body } from "express-validator/lib/middlewares/validation-chain-builders";
import { validationErrors } from "../../../middlewares/validation/validatorMiddleware";

export const validateForgotpassword = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  validationErrors,
];
