// validateForgotpassword
import { body, param, validationResult } from "express-validator";

import { validationErrors } from "../../../middlewares/validation/validatorMiddleware";

export const validateForgotpassword = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  validationErrors,
];
