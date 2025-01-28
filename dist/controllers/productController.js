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
exports.getPaginatedProducts = exports.getProduct = exports.deleteProduct = exports.updateProduct = exports.addProduct = void 0;
const CRUD_1 = require("../services/CRUD");
const slug_1 = require("../middlewares/slug");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prismaConfig_1 = require("../prisma/config/prismaConfig");
const modelName = "product";
exports.addProduct = [(0, slug_1.addSlugAttribute)("product_name"), (0, CRUD_1.add)(modelName)];
exports.updateProduct = (0, CRUD_1.update)(modelName);
exports.deleteProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    const where = {
        product_id: Number(product_id),
    };
    if (req.role === "User") {
        where.user_id = +req.params.user_id;
    }
    const result = yield prismaConfig_1.prisma.product.delete({
        where,
    });
    res.status(200).json({
        message: "Product deleted successfully",
        product: result,
    });
}));
exports.getProduct = (0, CRUD_1.getOne)(modelName);
exports.getPaginatedProducts = (0, CRUD_1.getMany)(modelName);
