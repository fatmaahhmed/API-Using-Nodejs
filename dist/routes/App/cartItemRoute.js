"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItem = void 0;
const cartItemsController_1 = require("../../controllers/cartItemsController");
const express_1 = __importDefault(require("express"));
const verifyTokenWithOptionalRole_1 = require("../../middlewares/auth/verifyTokenWithOptionalRole");
exports.cartItem = express_1.default.Router();
exports.cartItem.use((0, verifyTokenWithOptionalRole_1.isAuthenticated)());
exports.cartItem.get("/", cartItemsController_1.getCartItems);
exports.cartItem.post("/", cartItemsController_1.addCartItem);
exports.cartItem.put("/:cartItem_id", cartItemsController_1.updateCartItem);
exports.cartItem.delete("/:cartItem_id", cartItemsController_1.removeCartItem);
