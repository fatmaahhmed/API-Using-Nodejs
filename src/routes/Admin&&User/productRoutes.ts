import // validateDeleteProduct,
// validateProduct,
// validateUpdateProduct,
"../../utils/Validations/AdminValidation/Admin.Product";

import {
  addProduct,
  deleteProduct,
  getPaginatedProducts,
  getProduct,
  updateProduct,
} from "../../controllers/admin/productController";
import {
  validateDeleteproduct,
  validateproduct,
  validateproductUpdate,
} from "../../utils/Validations/AdminValidation/Admin.Product";

import express from "express";
import { isAuthenticated } from "../../middlewares/auth/verifyTokenWithOptionalRole";

const ProductRoute = express.Router();
// USER ROUTES for product
ProductRoute.post("/", isAuthenticated("User"), validateproduct, addProduct);
// update a product and delete a product
ProductRoute.route("/:product_id")
  .delete(isAuthenticated(), validateDeleteproduct, deleteProduct)
  .put(isAuthenticated("User"), validateproductUpdate, updateProduct);

// USER & ADMIN ROUTES for product
// get all products
ProductRoute.get("/", getPaginatedProducts);
// get a single product
ProductRoute.get("/:product_id", getProduct);

export default ProductRoute;
