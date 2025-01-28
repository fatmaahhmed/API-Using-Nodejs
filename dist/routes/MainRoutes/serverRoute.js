"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRoutes = void 0;
const ApiErrorHandler_1 = __importDefault(require("../../utils/err/ApiErrorHandler"));
const categoryRoute_1 = __importDefault(require("../Admin/categoryRoute"));
const productRoute_1 = __importDefault(require("../Admin&&User/productRoute"));
const subCategoryRoute_1 = __importDefault(require("../Admin/subCategoryRoute"));
const brandRoute_1 = __importDefault(require("../Admin/brandRoute"));
const cartItemRoute_1 = require("../App/cartItemRoute");
// import { cart } from "../App/cart";
const coponRoute_1 = __importDefault(require("../App/coponRoute"));
const _3_forgotPassword_1 = require("../Auth/3-forgotPassword");
const GlobalErrorHandlerMiddleware_1 = require("../../middlewares/Err/GlobalErrorHandlerMiddleware");
const verifyTokenWithOptionalRole_1 = require("../../middlewares/auth/verifyTokenWithOptionalRole");
const _2_login_1 = require("../Auth/2-login");
const _6_resetPassword_1 = require("../Auth/6-resetPassword");
const _1_signup_1 = require("../Auth/1-signup");
const userRoute_1 = __importDefault(require("../Admin/userRoute"));
// Define route paths as constants
const AUTH_BASE_PATH = "/auth";
const ADMIN_BASE_PATH = "/admin";
const USER_BASE_PATH = "/user";
// Function to apply auth routes
const applyAuthRoutes = (app) => {
    app.use(`${AUTH_BASE_PATH}/login`, _2_login_1.loginRouter);
    app.use(`${AUTH_BASE_PATH}/signUp`, _1_signup_1.signupRouter);
    app.use(`${AUTH_BASE_PATH}/forgot-password`, _3_forgotPassword_1.forgotpasswordRouter);
    app.use(`${AUTH_BASE_PATH}/reset-password`, _6_resetPassword_1.resetPasswordRouter);
    // app.use(`${AUTH_BASE_PATH}/verify-code`, verifyCodeRouter);
};
// Function to apply routes
const applyApiRoute = (app) => {
    app.use(`/api/product`, productRoute_1.default);
    app.use(`/api/copon`, coponRoute_1.default);
    app.use("/api/cartItem", cartItemRoute_1.cartItem);
    // app.use(`/api/cart`, cart);
};
// Function to apply admin routes
const applyAdminRoutes = (app) => {
    app.use(`/api/category`, categoryRoute_1.default);
    app.use(`/api/SubCategory`, subCategoryRoute_1.default);
    app.use(`/api/brand`, brandRoute_1.default);
    app.use(`/api/user`, userRoute_1.default);
};
// Function to apply user routes
const applyUserRoutes = (app) => {
    // app.use(isAuthenticated("User"));
    // app.use(`/api/wishlist`, authMiddleware, isUser, WishList);
};
const applyRoutes = (app) => {
    app.get("/", (req, res) => {
        res.send("MAIN ROUTE : Welcome to the API ✌️ hello from docker");
    });
    app.get("/test", (0, verifyTokenWithOptionalRole_1.isAuthenticated)("User"), (req, res) => {
        res.send("Middleware with parameter executed!");
    });
    // Apply auth routes
    applyAuthRoutes(app);
    // Apply admin routes
    applyAdminRoutes(app);
    // Apply user routes
    applyUserRoutes(app);
    // Apply copon routes
    applyApiRoute(app);
    // applyRoutes(app);
    app.all("*", (req, res, next) => {
        const message = `Resource not found : ${req.originalUrl}`;
        next(new ApiErrorHandler_1.default(message, 400));
    });
    app.use(GlobalErrorHandlerMiddleware_1.globalError);
};
exports.applyRoutes = applyRoutes;
