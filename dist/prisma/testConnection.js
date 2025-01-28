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
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = testConnection;
const prismaConfig_1 = require("./config/prismaConfig");
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Attempt a simple query to test the connection
            yield prismaConfig_1.prisma.$queryRaw `SELECT 1`;
            console.log("✅ Database connection successful");
            return true;
        }
        catch (error) {
            console.error("❌ Database connection failed:", error);
            return false;
        }
    });
}
