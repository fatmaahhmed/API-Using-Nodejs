import ApiError from "../../utils/err/ApiErrorHandler";
import Category from "../Admin/categoryRoute";
import Product from "../Admin&&User/productRoute";
import SubCategory from "../Admin/subCategoryRoute";
import brand from "../Admin/brandRoute";
import { cartItem } from "../App/cartItemRoute";
// import { cart } from "../App/cart";
import copon from "../App/coponRoute";
import { customMiddleware } from "../../middlewares/test";
import express from "express";
import { forgotpasswordRouter } from "../Auth/3-forgotPassword";
import { globalError } from "../../middlewares/Err/GlobalErrorHandlerMiddleware";
import { isAuthenticated } from "../../middlewares/auth/verifyTokenWithOptionalRole";
import { loginRouter } from "../Auth/2-login";
import { resetPasswordRouter } from "../Auth/6-resetPassword";
import { signupRouter } from "../Auth/1-signup";
import test from "../test";
import user from "../Admin/userRoute";

// Define route paths as constants
const AUTH_BASE_PATH = "/auth";
const ADMIN_BASE_PATH = "/admin";
const USER_BASE_PATH = "/user";

// Function to apply auth routes
const applyAuthRoutes = (app: express.Application) => {
  app.use(`${AUTH_BASE_PATH}/login`, loginRouter);
  app.use(`${AUTH_BASE_PATH}/signUp`, signupRouter);
  app.use(`${AUTH_BASE_PATH}/forgot-password`, forgotpasswordRouter);
  app.use(`${AUTH_BASE_PATH}/reset-password`, resetPasswordRouter);
  // app.use(`${AUTH_BASE_PATH}/verify-code`, verifyCodeRouter);
};
// Function to apply routes
const applyApiRoute = (app: express.Application) => {
  app.use(`/api/product`, Product);
  app.use(`/api/copon`, copon);
  app.use("/api/cartItem", cartItem);
  // app.use(`/api/cart`, cart);
};

// Function to apply admin routes
const applyAdminRoutes = (app: express.Application) => {
  app.use(`/api/category`, Category);
  app.use(`/api/SubCategory`, SubCategory);
  app.use(`/api/brand`, brand);
  app.use(`/api/user`, user);
};
// Function to apply user routes
const applyUserRoutes = (app: express.Application) => {
  // app.use(isAuthenticated("User"));
  // app.use(`/api/wishlist`, authMiddleware, isUser, WishList);
};

export const applyRoutes = (app: express.Application) => {
  app.get("/", (req, res) => {
    res.send("MAIN ROUTE : Welcome to the API");
  });
  app.get("/test", isAuthenticated("User"), (req, res) => {
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
    next(new ApiError(message, 400));
  });

  app.use(globalError);
};
