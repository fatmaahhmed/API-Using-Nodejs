"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
const validation_chain_builders_1 = require("express-validator/lib/middlewares/validation-chain-builders");
const validatorMiddleware_1 = require("../../middlewares/validation/validatorMiddleware");
exports.validateLogin = [
    // Validate category_name
    (0, validation_chain_builders_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),
    (0, validation_chain_builders_1.body)("password")
        // .isStrongPassword()
        // .withMessage(
        //   `Password must be strong consisting of at least8 characters,1 lowercase letter, 1 uppercase letter, 1 number,and 1 special characterlike Admin@123`
        // )
        .notEmpty()
        .withMessage("Password is required"),
    validatorMiddleware_1.validationErrors,
];
