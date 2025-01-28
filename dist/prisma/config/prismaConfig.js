"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
// src/lib/prisma.ts
const client_1 = require("@prisma/client");
const path_1 = __importDefault(require("path"));
// Create a singleton instance
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: `file:${path_1.default.resolve(__dirname, "../../prisma/dev.db")}`,
        },
    },
});
exports.prisma = prisma;
