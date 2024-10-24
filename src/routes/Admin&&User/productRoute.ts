import // validateDeleteProduct,
// validateProduct,
// validateUpdateProduct,
"../../utils/Validations/productValidation";

import {
  addProduct,
  deleteProduct,
  getPaginatedProducts,
  getProduct,
  updateProduct,
} from "../../controllers/productController";
import {
  validateDeleteproduct,
  validateproduct,
  validateproductUpdate,
} from "../../utils/Validations/productValidation";

import express from "express";
import { isAuthenticated } from "../../middlewares/auth/verifyTokenWithOptionalRole";

const ProductRoute = express.Router();
// USER ROUTES for product
ProductRoute.post("/", isAuthenticated("User"), addProduct);
// update a product and delete a product
ProductRoute.route("/:product_id")
  .delete(isAuthenticated(), validateDeleteproduct, deleteProduct)
  .put(isAuthenticated("User"), validateproductUpdate, updateProduct);

// USER & ADMIN ROUTES for product
// get all products
ProductRoute.get("/", isAuthenticated(), getPaginatedProducts);
// get a single product
ProductRoute.get("/:product_id", isAuthenticated(), getProduct);
// dele

export default ProductRoute;
