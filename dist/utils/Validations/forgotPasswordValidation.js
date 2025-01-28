"use strict";
// validateForgotpassword
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForgotPassword = void 0;
const validation_chain_builders_1 = require("express-validator/lib/middlewares/validation-chain-builders");
const validatorMiddleware_1 = require("../../middlewares/validation/validatorMiddleware");
exports.validateForgotPassword = [
    (0, validation_chain_builders_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),
    validatorMiddleware_1.validationErrors,
];
