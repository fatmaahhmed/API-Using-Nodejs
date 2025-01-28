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
exports.applyCopon = exports.validateCopon = void 0;
const prismaConfig_1 = require("../prisma/config/prismaConfig");
const validateCopon = (copon_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (copon_id) {
        copon_id = +copon_id;
        const copon = yield prismaConfig_1.prisma.copon.findUnique({
            where: { copon_id },
        });
        if (!copon) {
            return false;
        }
        if (copon) {
            if (copon.end_date < new Date() ||
                copon.is_active === false ||
                copon.start_date > new Date() ||
                copon.number_of_available_copons === 0) {
                return null;
            }
            return copon;
        }
    }
});
exports.validateCopon = validateCopon;
// apply copon discount to cart
const applyCopon = (cart_id, copon_id) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield prismaConfig_1.prisma.cart.findUnique({
        where: { cart_id },
        include: { cartItems: true },
    });
    const copon = yield prismaConfig_1.prisma.copon.findUnique({
        where: { copon_id },
    });
    if ((copon === null || copon === void 0 ? void 0 : copon.type) == "percentage") {
        const discount = (cart === null || cart === void 0 ? void 0 : cart.total_with_copon)
            ? (cart.total_with_copon * (copon === null || copon === void 0 ? void 0 : copon.discount)) / 100
            : 0;
        return discount;
    }
    else if ((copon === null || copon === void 0 ? void 0 : copon.type) == "fixed") {
        return (cart === null || cart === void 0 ? void 0 : cart.total_with_copon) ? (cart === null || cart === void 0 ? void 0 : cart.total_with_copon) - copon.discount : 0;
    }
});
exports.applyCopon = applyCopon;
