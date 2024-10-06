import {
  addBrand,
  deleteBrand,
  getBrand,
  getPaginatedBrands,
  updateBrand,
} from "../../controllers/admin/brandController";

//  import { SubBrand } from "./Admin.SubBrand";
import express from "express";
import { verifyTokenWithOptionalRole } from "../../middlewares/auth/verifyTokenWithOptionalRole";

// import {
//   validateBrand,
//   validateBrandUpdate,
//   validateDeleteBrand,
// } from "../../utils/Validations/AdminValidation/Admin.Brand";

const brand = express.Router();
// Brand.use("/:Brand_id/subBrand/", getBrand);

brand.get("/:brand_id", getBrand);
brand.get("/", getPaginatedBrands);
brand.post(
  "/",
  // validateBrand,
  verifyTokenWithOptionalRole("Admin"),
  addBrand
);
brand
  .route("/:brand_id")
  .delete(
    // validateDeleteBrand,
    verifyTokenWithOptionalRole("Admin"),
    deleteBrand
  )
  .put(
    // validateBrandUpdate,
    verifyTokenWithOptionalRole("Admin"),
    updateBrand
  );

export default brand;
