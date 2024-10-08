import // validateDeleteProduct,
// validateProduct,
// validateUpdateProduct,
"../../utils/Validations/AdminValidation/Admin.Product";

import {
  deleteProduct,
  getPaginatedProducts,
  getProduct,
} from "../../controllers/admin/productController";

import express from "express";
import { isAuthenticated } from "../../middlewares/auth/verifyTokenWithOptionalRole";

const ProductRoute = express.Router();

ProductRoute.get("/:product_id", getProduct);
isAuthenticated("Admin"), ProductRoute.get("/", getPaginatedProducts);
ProductRoute.route("/:product_id").delete(
  isAuthenticated("Admin"),
  // validateDeleteProduct,
  deleteProduct
);

export default ProductRoute;
