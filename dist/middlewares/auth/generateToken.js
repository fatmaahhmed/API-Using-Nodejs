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
exports.generateAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const generateAuthToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const privateKey = process.env.JWTPRIVATEKEY; // Make sure this matches your .env file
    if (!privateKey) {
        throw new Error("Private key is not defined in environment variables.");
    }
    const payload = {
        role: req.role || "user",
        email: req.email || "",
        user_id: +req.params.user_id,
    };
    console.log(`payload: ${JSON.stringify(payload)}`);
    const token = jsonwebtoken_1.default.sign(payload, privateKey, { expiresIn: "5h" });
    req.token = token;
});
exports.generateAuthToken = generateAuthToken;
