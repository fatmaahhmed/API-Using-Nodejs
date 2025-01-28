"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrismaError = void 0;
const client_1 = require("@prisma/client");
const ApiErrorHandler_1 = __importDefault(require("./ApiErrorHandler"));
const handlePrismaError = (error) => {
    var _a, _b, _c, _d, _e, _f;
    console.log("error", error);
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002": // Unique constraint failed
                console.log(`A unique constraint failed on the database`, 409);
                return new ApiErrorHandler_1.default(`A unique constraint failed on the database : ${(_a = error.meta) === null || _a === void 0 ? void 0 : _a.target}`, 409);
            case "P2003": // Foreign key constraint failed
                console.log("Foreign key constraint failed");
                return new ApiErrorHandler_1.default(`A foreign key constraint failed : ${(_b = error.meta) === null || _b === void 0 ? void 0 : _b.target}`, 400);
            case "P2025": // Record to update/delete not found
                console.log("Record to update/delete not found");
                return new ApiErrorHandler_1.default(`Record not found : ${(_c = error.meta) === null || _c === void 0 ? void 0 : _c.target}`, 404);
            case "P2011": // The model was not found
                console.log("the model was not found");
                return new ApiErrorHandler_1.default(`The model was not found ${(_d = error.meta) === null || _d === void 0 ? void 0 : _d.target}`, 404);
            case "P2012": // Relation required
                console.log("A relation required was not provided");
                return new ApiErrorHandler_1.default(`A relation required was not provided : ${(_e = error.meta) === null || _e === void 0 ? void 0 : _e.target}`, 400);
            case "P2014": // The query requires an implicit return
                return new ApiErrorHandler_1.default(`Query requires an implicit return : ${(_f = error.meta) === null || _f === void 0 ? void 0 : _f.target}`, 400);
            default:
                return new ApiErrorHandler_1.default("An unexpected error occurred", 500);
        }
    }
    console.error("An unexpected error occurred", error);
    return new ApiErrorHandler_1.default("An unexpected error occurred", 500);
};
exports.handlePrismaError = handlePrismaError;
