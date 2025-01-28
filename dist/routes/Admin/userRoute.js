"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../../controllers/userController");
//  import { SubUser } from "./Admin.SubUser";
const express_1 = __importDefault(require("express"));
const verifyTokenWithOptionalRole_1 = require("../../middlewares/auth/verifyTokenWithOptionalRole");
const user = express_1.default.Router();
user.get("/", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), userController_1.getPaginatedUsers);
user.get("/:user_id", (0, verifyTokenWithOptionalRole_1.isAuthenticated)(), userController_1.getUser);
user.post("/", 
//  validateUser,
(0, verifyTokenWithOptionalRole_1.isAuthenticated)("Admin"), userController_1.addUser);
user
    .route("/:user_id")
    .delete(
// validateDeleteUser,
(0, verifyTokenWithOptionalRole_1.isAuthenticated)("Admin"), userController_1.deleteUser)
    .put(
// validateUserUpdate,
(0, verifyTokenWithOptionalRole_1.isAuthenticated)("Admin"), userController_1.updateUser);
exports.default = user;
