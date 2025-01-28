"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
//reload env variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    console.error(`Error details: ${err.stack}`);
    console.log("------------------------------------------------------------");
    console.log(err.name);
    console.log("------------------------------------------------------------");
    console.log(err.message);
    if (process.env.NODE_ENV == "development") {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
        });
    }
    else {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
};
exports.globalError = globalError;
