import ApiError from "../../utils/err/ApiErrorHandler";
import Category from "../Admin/categoryRoutes";
import Product from "../Admin/productRoutes";
import SubCategory from "../Admin/subCategoryRoutes";
import brand from "../Admin/brand";
import express from "express";
import { forgotpasswordRouter } from "../Auth/3-forgotPassword";
import { globalError } from "../../middlewares/Err/GlobalErrorHandlerMiddleware";
import { loginRouter } from "./../Auth/2-login";
import { resetPasswordRouter } from "../Auth/6-resetPassword";
import { signupRouter } from "../Auth/1-signup";
import user from "../Admin/userRoutes";
import { verifyTokenWithOptionalRole } from "../../middlewares/auth/verifyTokenWithOptionalRole";

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
// Function to apply admin routes
const applyAdminRoutes = (app: express.Application) => {
  app.use(`${ADMIN_BASE_PATH}/category`, Category);
  app.use(`${ADMIN_BASE_PATH}/SubCategory`, SubCategory);
  app.use(`${ADMIN_BASE_PATH}/product`, Product);
  app.use(`${ADMIN_BASE_PATH}/brand`, brand);
  app.use(`${ADMIN_BASE_PATH}/user`, user);
};
// Function to apply user routes
const applyUserRoutes = (app: express.Application) => {
  app.use(verifyTokenWithOptionalRole("User"));
  app.use(`${USER_BASE_PATH}/product`, Product);
  // app.use(`${USER_BASE_PATH}/wishlist`, authMiddleware, isUser, WishList);
};

export const applyRoutes = (app: express.Application) => {
  app.get("/", (req, res) => {
    res.send("MAIN ROUTE : Welcome to the API");
  });
  // Apply auth routes
  applyAuthRoutes(app);

  // Apply admin routes
  applyAdminRoutes(app);

  // Apply user routes
  applyUserRoutes(app);

  app.all("*", (req, res, next) => {
    const message = `Resource not found : ${req.originalUrl}`;
    next(new ApiError(message, 400));
  });

  app.use(globalError);
};
