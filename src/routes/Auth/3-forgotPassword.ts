import { Router } from "express";
import { forgotpassword } from "../../controllers/auth/3-forgotPassword";
import { generateAuthToken } from "../../middlewares/auth/generateToken";
import { validateForgotpassword } from "../../utils/Validations/Auth/validateForgotpassword";

export const forgotpasswordRouter = Router();
forgotpasswordRouter.post(
  "/",
  // validateForgotpassword,
  forgotpassword
  // generateAuthToken
);
