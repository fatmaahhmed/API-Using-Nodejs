"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_1 = require("express");
const generateToken_1 = require("../../middlewares/auth/generateToken");
const _2_login_1 = require("../../controllers/auth/2-login");
const loginValidation_1 = require("../../utils/Validations/loginValidation");
exports.loginRouter = (0, express_1.Router)();
exports.loginRouter.post("/", loginValidation_1.validateLogin, _2_login_1.login, generateToken_1.generateAuthToken);
