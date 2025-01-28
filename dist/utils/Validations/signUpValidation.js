"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignUp = void 0;
const validation_chain_builders_1 = require("express-validator/lib/middlewares/validation-chain-builders");
const validatorMiddleware_1 = require("../../middlewares/validation/validatorMiddleware");
exports.validateSignUp = [
    // Validate category_name
    (0, validation_chain_builders_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),
    (0, validation_chain_builders_1.body)("username").isString().notEmpty().withMessage("Username is required"),
    // body("phone")
    //   .notEmpty()
    //   .withMessage("Phone number is required")
    //   .isMobilePhone("any")
    //   .withMessage("Phone number is invalid"),
    (0, validation_chain_builders_1.body)("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string"),
    // Validate parent_id (optional)
    //Admin@123
    (0, validation_chain_builders_1.body)("password")
        .isStrongPassword()
        .withMessage(`password invalid`)
        .notEmpty()
        .withMessage("Password is required"),
    validatorMiddleware_1.validationErrors,
];
