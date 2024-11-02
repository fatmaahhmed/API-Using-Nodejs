import { NextFunction, Request, Response } from "express";
import {
  addCopon,
  deleteCopon,
  getCopon,
  getPaginatedCopons,
  updateCopon,
} from "../../controllers/coponController";
import {
  validateDeletecopon,
  validatecopon,
  validatecoponUpdate,
} from "../../utils/Validations/coponValidation";

import { ExtendedRequest } from "../../utils/Types/request/request";
import { checkUserHasProducts } from "../../services/UserAndAdmin";
import express from "express";
import { isAuthenticated } from "../../middlewares/auth/verifyTokenWithOptionalRole";

export const copon = express.Router();
export const userProducts = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.params.user_id) {
    const checkUserHasProduct = await checkUserHasProducts(+req.params.user_id);
    console.log("checkUserHasProduct", checkUserHasProduct);
    if (checkUserHasProduct == 0) {
      res.status(400).json({
        error: `You must have at least one product to add a copon`,
      });
      console.log("You must have at least one product to add a copon");
      return;
    }
    next();
  }
};
copon.post("/", isAuthenticated(), userProducts, validatecopon, addCopon);

copon.get("/:copon_id", isAuthenticated(), getCopon);
copon.get("/", isAuthenticated(), getPaginatedCopons);

copon
  .route("/:copon_id")
  .delete(isAuthenticated("Admin"), validateDeletecopon, deleteCopon)
  .put(isAuthenticated("Admin"), validatecoponUpdate, updateCopon);
export default copon;
