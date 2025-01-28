"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMiddlewares = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const loggerMiddleware_1 = require("../log/loggerMiddleware");
const applyMiddlewares = (app) => {
    app.use(express_1.default.json());
    app.use(body_parser_1.default.json());
    app.use(loggerMiddleware_1.requestLoggerMiddleware);
};
exports.applyMiddlewares = applyMiddlewares;
