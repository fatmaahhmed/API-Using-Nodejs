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
import { isAuthenticated } from "../../middlewares/auth/verifyTokenWithOptionalRole";

const Product = express.Router();
// create a new product
Product.post("/", isAuthenticated("User"), validateproduct, addProduct);
// update a product and delete a product
Product.route("/:Product_id")
  .delete(isAuthenticated("User"), validateDeleteproduct, deleteProduct)
  .put(isAuthenticated("User"), validateproductUpdate, updateProduct);
// get all products
Product.get("/", getPaginatedProducts);
// get a single product
Product.get("/:Product_id", getProduct);

export default Product;
