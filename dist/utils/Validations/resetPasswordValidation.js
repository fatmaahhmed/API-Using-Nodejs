"use strict";
// validateForgotpassword
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResetPassword = void 0;
const validation_chain_builders_1 = require("express-validator/lib/middlewares/validation-chain-builders");
const validatorMiddleware_1 = require("../../middlewares/validation/validatorMiddleware");
exports.validateResetPassword = [
    (0, validation_chain_builders_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),
    (0, validation_chain_builders_1.body)("code")
        .notEmpty()
        .withMessage("Code is required")
        .isNumeric()
        .withMessage("Code must be a number"),
    (0, validation_chain_builders_1.body)("password")
        // .isStrongPassword()
        // .withMessage(`password invalid`)
        .notEmpty()
        .withMessage("Password is required"),
    validatorMiddleware_1.validationErrors,
];
