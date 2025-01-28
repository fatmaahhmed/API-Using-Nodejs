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
exports.resetPassword = void 0;
const UserAndAdmin_1 = require("../../services/UserAndAdmin");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const hashPassword_1 = require("../../utils/HassingPasswordFunction/hashPassword");
exports.resetPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield (0, UserAndAdmin_1.findUserByEmail)(req.body.email);
    if (user) {
        if (user.verified) {
            res
                .status(400)
                .json({ message: "User has already verified their account" });
        }
        if (user.verification_code_expires < new Date() && !user.verified) {
            res.status(400).json({ message: "Verification code has expired" });
        }
        const hashedPassword = yield (0, hashPassword_1.hashPassword)(req.body.password);
        yield (0, UserAndAdmin_1.updateUser)(user.user_id, {
            password: hashedPassword,
            verified: true,
            verificationCode: "",
            verification_code_expires: new Date(),
        });
    }
    next();
    res
        .status(200)
        .json({ message: "Password changed successfully", token: req.token });
}));
