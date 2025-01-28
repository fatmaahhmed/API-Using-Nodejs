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
exports.forgotpassword = void 0;
const UserAndAdmin_1 = require("../../services/UserAndAdmin");
const ApiErrorHandler_1 = __importDefault(require("../../utils/err/ApiErrorHandler"));
const _4_sendCodeViaMail_1 = require("./4-sendCodeViaMail");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.forgotpassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield (0, UserAndAdmin_1.findUserByEmail)(req.body.email);
    if (!user) {
        throw new ApiErrorHandler_1.default("User not found", 404);
    }
    const verificationCode = Math.floor(1000 + Math.random() * 9000);
    const hashedCode = yield bcrypt_1.default.hash(verificationCode.toString(), 10);
    console.log("hashedCode", hashedCode);
    console.log("verificationCode", verificationCode);
    const verifiedLastValue = user.verified;
    let updateData = {
        verificationCode: hashedCode,
        verification_code_expires: new Date(Date.now() + 5 * 60 * 1000),
        verified: false,
    };
    yield (0, UserAndAdmin_1.updateUser)(user.user_id, updateData);
    try {
        yield (0, _4_sendCodeViaMail_1.SendingCode)(verificationCode, req.body.email);
        res.status(200).json({ message: "Verification code sent" });
    }
    catch (error) {
        updateData = {
            verificationCode: "",
            verification_code_expires: new Date(),
            verified: verifiedLastValue,
        };
        yield (0, UserAndAdmin_1.updateUser)(user.user_id, updateData);
        throw new ApiErrorHandler_1.default("Error sending verification code", 500);
    }
}));
