"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../middlewares/test");
const express_1 = __importDefault(require("express"));
const test = express_1.default.Router();
// Route using the middleware with a parameter
test.get("/test", (0, test_1.customMiddleware)("special"), (req, res) => {
    res.send("Middleware with parameter executed!");
});
exports.default = test;
