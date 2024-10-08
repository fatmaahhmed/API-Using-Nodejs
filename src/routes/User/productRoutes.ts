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

//  import { SubProduct } from "./User.SubProduct";
import express from "express";
import { verifyTokenWithOptionalRole } from "../../middlewares/auth/verifyTokenWithOptionalRole";

const Product = express.Router();
// create a new product
Product.post(
  "/",
  verifyTokenWithOptionalRole("User"),
  validateproduct,
  addProduct
);
// update a product and delete a product
Product.route("/:Product_id")
  .delete(
    verifyTokenWithOptionalRole("User"),
    validateDeleteproduct,
    deleteProduct
  )
  .put(
    verifyTokenWithOptionalRole("User"),
    validateproductUpdate,
    updateProduct
  );
// get all products
Product.get("/", getPaginatedProducts);
// get a single product
Product.get("/:Product_id", getProduct);

export default Product;
