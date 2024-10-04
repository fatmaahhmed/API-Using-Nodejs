//   app.all("*", (req, res, next) => {
//     const message = `Resource not found : ${req.originalUrl}`;
//     next(new ApiError(message, 400));
//   });
//   app.use(globalError);
// };
// // Function to apply auth routes
// const applyAuthRoutes = (app: express.Application) => {
//   app.use(`${AUTH_BASE_PATH}/login`, loginRouter);
//   app.use(`${AUTH_BASE_PATH}/signUp`, signupRouter);
//   app.use(`${AUTH_BASE_PATH}/forgot-password`, forgotpasswordRouter);
//   app.use(`${AUTH_BASE_PATH}/reset-password`, resetPasswordRouter);
//   // app.use(`${AUTH_BASE_PATH}/verify-code`, verifyCodeRouter);
// };
// // Function to apply admin routes
// const applyAdminRoutes = (app: express.Application) => {
//   app.use(`${ADMIN_BASE_PATH}/category`, Category);
//   app.use(`${ADMIN_BASE_PATH}/SubCategory`, SubCategory);
//   app.use(`${ADMIN_BASE_PATH}/product`, Product);
//   // app.use(`${ADMIN_BASE_PATH}/user`, User);
// };
// // Function to apply user routes
// const applyUserRoutes = (app: express.Application) => {
//   // app.use(verifyTokenWithOptionalRole("User"));
//   // app.use(`${USER_BASE_PATH}/product`, authMiddleware, isUser, UserProduct);
//   // app.use(`${USER_BASE_PATH}/wishlist`, authMiddleware, isUser, WishList);
//   // app.use("/user/product", authMiddleware, isUser, UserProduct);
//   // app.use("/user/whishlist", authMiddleware, isUser, WishList);
//   // @admin routes
//   // app.use("/admin/category", authMiddleware, isAdmin, Category);
//   // app.use("/admin/product", authMiddleware, isAdmin, Product);
//   // app.use("/admin/users", authMiddleware, isAdmin, User);
// };
// testing server
import express, { Request, Response } from "express";

import ApiError from "../../utils/ApiErrorHandler";
import Category from "../Admin/categoryRoutes";
import Product from "../Admin/productRoutes";
import SubCategory from "../Admin/subCategoryRoutes";

// import User from "../Admin/userRoutes";
// import express from "express";
// import { forgotpasswordRouter } from "../Auth/3-forgotPassword";
// import { globalError } from "../../middlewares/err/globalErrorHandlerMiddleware";
// import { loginRouter } from "./../Auth/2-login";
// import { resetPasswordRouter } from "../Auth/6-resetPassword";
// import { signupRouter } from "../Auth/1-signup";
// // import { verifyCodeRouter } from "../Auth/5-verifyCode";

// // Define route paths as constants
// const AUTH_BASE_PATH = "/auth";
// const ADMIN_BASE_PATH = "/admin";
// const USER_BASE_PATH = "/user";
// export const applyRoutes = (app: express.Application) => {
//   app.get("/", (req, res) => {
//     res.send("Hello, World!!!");
//   });
//   // Apply auth routes
//   applyAuthRoutes(app);

//   // Apply admin routes
//   applyAdminRoutes(app);

//   // Apply user routes
//   applyUserRoutes(app);
