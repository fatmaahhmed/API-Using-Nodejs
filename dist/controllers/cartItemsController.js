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
exports.removeCartItem = exports.updateCartItem = exports.getCartItems = exports.addCartItem = void 0;
const cartItem_1 = require("../services/cartItem");
const cartController_1 = require("./cartController");
const product_1 = require("../services/product");
const ApiErrorHandler_1 = __importDefault(require("../utils/err/ApiErrorHandler"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prismaConfig_1 = require("../prisma/config/prismaConfig");
// cartItem CRUDs
exports.addCartItem = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { product_id, quantity, copon_id } = req.body;
    const userId = +req.params.user_id;
    // validate product
    const product = yield (0, product_1.productExistence)(product_id);
    // check if quantity is available
    if (product && product.quantity < quantity) {
        res.status(400);
        next(new ApiErrorHandler_1.default("Product quantity is not available", 400));
        return;
    }
    // Find existing cart item or create a new one
    let cartItem = yield (0, cartItem_1.cartItemExistence)(product_id, userId);
    if (cartItem && product) {
        // update cart item
        const updatedCartItem = yield prismaConfig_1.prisma.cartItem.update({
            where: { cartItem_id: cartItem.cartItem_id },
            data: {
                quantity: cartItem.quantity + quantity,
                subtotal: cartItem.subtotal + quantity * product.price,
            },
        });
    }
    else if (cartItem == false && product) {
        yield (0, cartItem_1.createCartItem)(userId, product_id, quantity, product.price, quantity * product.price);
    }
    // update cart
    let cart = yield (0, cartController_1.getCart)(userId);
    if (!cart) {
        cart = (yield (0, cartController_1.createCart)(userId));
    }
    // update cart total
    if (cart && product) {
        yield (0, cartController_1.updateCart)(userId, {
            total_price: cart.total_price + quantity * product.price,
        });
        res.status(201).json({
            message: "Cart item added successfully",
        });
    }
    else {
        res.status(400);
        next(new ApiErrorHandler_1.default("Cart or product not found", 400));
    }
}));
// get all cart items
exports.getCartItems = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.user_id;
    const cartItems = yield prismaConfig_1.prisma.cartItem.findMany({
        where: { cart_id: userId },
        select: {
            product_id: true,
            quantity: true,
            unit_price: true,
            subtotal: true,
            createdAt: true,
            product: {
                select: {
                    product_name: true,
                    price: true,
                    quantity: true,
                    description: true,
                },
            },
            cart: {
                select: {
                    total_price: true,
                },
            },
        },
    });
    res.status(200).json(cartItems);
}));
// update cart item
exports.updateCartItem = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.user_id;
    const { cartItem_id, quantity } = req.body;
    const cartItem = yield prismaConfig_1.prisma.cartItem.findUnique({
        where: { cartItem_id },
    });
    if (cartItem) {
        const product = yield (0, product_1.productExistence)(cartItem.product_id);
        if (product && product.quantity < quantity) {
            res.status(400);
            next(new ApiErrorHandler_1.default("Product quantity is not available", 400));
            return;
        }
        const updatedCartItem = yield prismaConfig_1.prisma.cartItem.update({
            where: { cartItem_id },
            data: {
                quantity,
                subtotal: quantity * cartItem.unit_price,
            },
        });
        // update cart
        let cart = yield (0, cartController_1.getCart)(userId);
        if (cart && product) {
            yield (0, cartController_1.updateCart)(userId, {
                total_price: cart.total_price + quantity * product.price,
            });
            res.status(200).json({
                message: "Cart item updated successfully",
            });
        }
        else {
            res.status(400);
            next(new ApiErrorHandler_1.default("Cart or product not found", 400));
        }
    }
    else {
        res.status(404);
        next(new ApiErrorHandler_1.default("Cart item not found", 404));
    }
}));
// remove cart item
exports.removeCartItem = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.user_id;
    const { cartItem_id } = req.body;
    const cartItem = yield prismaConfig_1.prisma.cartItem.findUnique({
        where: { cartItem_id },
    });
    if (cartItem) {
        yield prismaConfig_1.prisma.cartItem.delete({
            where: { cartItem_id },
        });
        // update cart
        let cart = yield (0, cartController_1.getCart)(userId);
        if (cart) {
            yield (0, cartController_1.updateCart)(userId, {
                total_price: cart.total_price - cartItem.subtotal,
            });
            res.status(200).json({
                message: "Cart item removed successfully",
            });
        }
        else {
            res.status(400);
            next(new ApiErrorHandler_1.default("Cart not found", 400));
        }
    }
    else {
        res.status(404);
        next(new ApiErrorHandler_1.default("Cart item not found", 404));
    }
}));
