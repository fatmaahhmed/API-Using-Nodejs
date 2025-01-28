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
exports.isAuthenticated = void 0;
const ApiErrorHandler_1 = __importDefault(require("../../utils/err/ApiErrorHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Helper function to verify token
function decodeToken(token, privateKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jsonwt = jsonwebtoken_1.default.verify(token, privateKey);
            return jsonwt;
        }
        catch (error) {
            console.error("Token verification failed:", error);
            throw new ApiErrorHandler_1.default("Token verification failed", 401);
        }
    });
}
// Properly typed middleware
const isAuthenticated = (role = "not defined") => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            console.log("Role passed to isAuthenticated:", role);
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                res.status(401).json({ message: "Unauthorized: No token provided" });
                return;
            }
            const jwtPrivateKey = process.env.JWTPRIVATEKEY;
            if (!jwtPrivateKey) {
                res.status(500).json({
                    message: "Internal Server Error: JWT private key is missing",
                });
                return;
            }
            const decoded = yield decodeToken(token, jwtPrivateKey);
            console.log("decoded Token-->", decoded);
            if (role == "not defined") {
                role = decoded.role;
            }
            if (decoded.role !== role) {
                res.status(403).json({ message: "Forbidden: Access is denied" });
                return;
            }
            req.params.user_id = decoded.user_id.toString();
            req.role = decoded.role;
            console.log("req.params.user_id-->", req.params.user_id);
            console.log("req.role-->", req.role);
            next();
        }
        catch (error) {
            console.error("Token verification failed:", error);
            res.status(401).json({ message: "Unauthorized: Invalid token" });
            return;
        }
    });
};
exports.isAuthenticated = isAuthenticated;
