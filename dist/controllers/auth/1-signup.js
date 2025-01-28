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
exports.signUp = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const handlePrismaerror_1 = require("../../utils/err/handlePrismaerror");
const hashPassword_1 = require("../../utils/HassingPasswordFunction/hashPassword");
const prismaConfig_1 = require("../../prisma/config/prismaConfig");
exports.signUp = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { password } = req.body;
    password = yield (0, hashPassword_1.hashPassword)(password);
    req.body.password = password;
    console.log(`req.body ${JSON.stringify(req.body)}`);
    const user = yield prismaConfig_1.prisma.user
        .create({
        data: Object.assign({}, req.body),
        select: {
            user_id: true,
            email: true,
            role: true,
        },
    })
        .catch((error) => {
        console.log(error);
        throw (0, handlePrismaerror_1.handlePrismaError)(error);
    });
    req.params.user_id = user.user_id.toString();
    req.body.role = user.role;
    req.body.email = user.email;
    next();
    const message = `User added successfully`;
    console.log(req.token);
    res.status(201).json({ message, user, token: req.token });
}));
