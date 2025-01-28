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
exports.checkUserHasProducts = exports.updateUser = exports.findUserByEmail = void 0;
const handlePrismaerror_1 = require("../utils/err/handlePrismaerror");
const prismaConfig_1 = require("../prisma/config/prismaConfig");
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaConfig_1.prisma.user
        .findUnique({
        where: { email },
    })
        .catch((err) => {
        (0, handlePrismaerror_1.handlePrismaError)(err);
    });
    return user;
}); /**1727330293677 */
exports.findUserByEmail = findUserByEmail;
const updateUser = (user_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaConfig_1.prisma.user
        .update({
        where: { user_id: user_id },
        data,
    })
        .catch((err) => {
        (0, handlePrismaerror_1.handlePrismaError)(err);
    });
    return user;
});
exports.updateUser = updateUser;
// check if user has products or not
const checkUserHasProducts = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaConfig_1.prisma.user
        .findUnique({
        where: { user_id: user_id },
        include: { products: true },
    })
        .catch((err) => {
        (0, handlePrismaerror_1.handlePrismaError)(err);
    });
    console.log("user-->", user);
    return user === null || user === void 0 ? void 0 : user.products.length;
});
exports.checkUserHasProducts = checkUserHasProducts;
