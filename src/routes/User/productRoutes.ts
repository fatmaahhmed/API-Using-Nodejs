// import { Router } from "express";
// import { isAdmin } from "../../middlewares/IsAdmin";
// import { isUser } from "../../middlewares/IsUser";
// import jwtMiddleware from "../../middlewares/authMiddleware";
// // import { productService } from "../../controllers/UserServices/User.Products";
// import { requestLoggerMiddleware } from "../../middlewares/loggerMiddleware";

// const UserProduct = Router();
// UserProduct.use(requestLoggerMiddleware);
// //todo: Apply JWT middleware to all subsequent routes
// UserProduct.use(jwtMiddleware);
// UserProduct.use(isUser);

// // Product routes for users
// UserProduct.post("/:user_id/addProducts", (req, res) =>
//   productService.addProduct(req, res)
// );
// UserProduct.put("/:userId/updateproducts/:productId", (req, res) =>
//   productService.updateProduct(req, res)
// );

// UserProduct.get("/products", (req, res) =>
//   productService.getPaginatedProducts(req, res)
// );

// UserProduct.delete("/:userId/deleteproducts/:productId", (req, res) =>
//   productService.deleteProduct(req, res)
// );

// export default UserProduct;
