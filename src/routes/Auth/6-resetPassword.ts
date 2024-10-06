import { Router } from "express";
import { generateAuthToken } from "../../middlewares/auth/generateToken";
import { resetPassword } from "../../controllers/auth/6-resetPassword";
import { validateResetPassword } from "../../utils/Validations/Auth/ResetPassword";
import { verifyCode } from "../../controllers/auth/5-verifyCode";
export const resetPasswordRouter = Router();
resetPasswordRouter.post(
  "/",
  validateResetPassword,
  verifyCode,
  resetPassword,
  generateAuthToken
);
