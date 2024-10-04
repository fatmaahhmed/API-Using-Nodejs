import { Product } from "../../utils/Types/request/types";
import {
  deleteProduct,
  getPaginatedProducts,
} from "../../controllers/admin/productController";

import bodyParser from "body-parser";
import express from "express";
import { verify } from "jsonwebtoken";
import { verifyTokenWithOptionalRole } from "../../middlewares/auth/verifyTokenWithOptionalRole";

const Product = express.Router();

Product.use(bodyParser.json());
Product.use(verifyTokenWithOptionalRole("Admin"));
Product.get("/", getPaginatedProducts);
Product.delete("/:product_id", deleteProduct);

export default Product;
