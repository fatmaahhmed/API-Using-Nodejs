"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const ApiErrorHandler_1 = __importDefault(require("../../utils/err/ApiErrorHandler"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserAndAdmin_1 = require("../../services/UserAndAdmin");
exports.login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, UserAndAdmin_1.findUserByEmail)(email);
    if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
        throw new ApiErrorHandler_1.default("Invalid email or password", 401);
    }
    req.role = user.role;
    req.params.user_id = user.user_id.toString();
    req.email = user.email;
    next();
    res.status(200).json({ message: "Login successful", token: req.token });
}));
