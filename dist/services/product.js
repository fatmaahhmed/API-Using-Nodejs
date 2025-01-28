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
exports.updateProduct = exports.productExistence = void 0;
const ApiErrorHandler_1 = __importDefault(require("../utils/err/ApiErrorHandler"));
const prismaConfig_1 = require("../prisma/config/prismaConfig");
const productExistence = (product_id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prismaConfig_1.prisma.product.findUnique({
        where: { product_id },
    });
    if (!product) {
        new ApiErrorHandler_1.default("Product not found", 404);
    }
    else if (product) {
        if (product.quantity < 1) {
            new ApiErrorHandler_1.default("Product is out of stock", 404);
        }
        else {
            return product;
        }
    }
});
exports.productExistence = productExistence;
// update product
const updateProduct = (product_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prismaConfig_1.prisma.product.update({
        where: { product_id },
        data,
    });
    return product;
});
exports.updateProduct = updateProduct;
