"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotpasswordRouter = void 0;
const express_1 = require("express");
const _3_forgotPassword_1 = require("../../controllers/auth/3-forgotPassword");
const forgotPasswordValidation_1 = require("../../utils/Validations/forgotPasswordValidation");
exports.forgotpasswordRouter = (0, express_1.Router)();
exports.forgotpasswordRouter.post("/", forgotPasswordValidation_1.validateForgotPassword, _3_forgotPassword_1.forgotpassword);
