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
exports.verifyCode = void 0;
const UserAndAdmin_1 = require("../../services/UserAndAdmin");
const ApiErrorHandler_1 = __importDefault(require("../../utils/err/ApiErrorHandler"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// check if the code is correct
exports.verifyCode = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield (0, UserAndAdmin_1.findUserByEmail)(req.body.email);
    const ismatch = yield bcrypt_1.default.compare(req.body.code, user.verificationCode);
    if (!ismatch) {
        throw new ApiErrorHandler_1.default("Invalid code", 401);
    }
    if (new Date() > user.verification_code_expires) {
        throw new ApiErrorHandler_1.default("Code expired", 401);
    }
    yield (0, UserAndAdmin_1.updateUser)(user.user_id, {
        verified: false,
    });
    next();
}));
