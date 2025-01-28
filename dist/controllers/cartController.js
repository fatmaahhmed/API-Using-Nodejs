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
exports.updateCart = exports.createCart = exports.getCart = void 0;
const prismaConfig_1 = require("../prisma/config/prismaConfig");
const modelName = "cart";
// cart CRUD
const getCart = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield prismaConfig_1.prisma.cart.findUnique({
        where: { user_id },
        include: { cartItems: true },
    });
    return cart;
});
exports.getCart = getCart;
// create cart
const createCart = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield prismaConfig_1.prisma.cart.create({
        data: {
            cart_id: user_id,
            user_id: user_id,
        },
    });
    return cart;
});
exports.createCart = createCart;
// update cart
const updateCart = (user_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield prismaConfig_1.prisma.cart.update({
        where: { user_id },
        data,
    });
    return cart;
});
exports.updateCart = updateCart;
//     // check if copon is valid and exists or not
// if (copon_id) {
//   const copon = await validateCopon(copon_id);
//   if (copon == null) {
//     res.status(404);
//     next(new ApiError("Copon Not Valid", 404));
//   }
//   if (copon == false) {
//     res.status(404);
//     next(new ApiError("Copon not found", 404));
//   }
// }
