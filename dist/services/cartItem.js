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
exports.createCartItem = exports.cartItemExistence = void 0;
const prismaConfig_1 = require("../prisma/config/prismaConfig");
// check cartItem existence
const cartItemExistence = (user_id, product_id) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItem = yield prismaConfig_1.prisma.cartItem.findFirst({
        where: {
            cart_id: user_id,
            product_id,
        },
    });
    if (!cartItem) {
        return false;
    }
    return cartItem;
});
exports.cartItemExistence = cartItemExistence;
// create cartItem
const createCartItem = (user_id, product_id, quantity, unit_price, subtotal) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItem = yield prismaConfig_1.prisma.cartItem.create({
        data: {
            cart_id: user_id,
            product_id,
            quantity,
            unit_price,
            subtotal,
        },
    });
    return cartItem;
});
exports.createCartItem = createCartItem;
