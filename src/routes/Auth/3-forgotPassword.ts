import { Router } from "express";
import { forgotpassword } from "../../controllers/auth/3-forgotPassword";
import { validateForgotPassword } from "../../utils/Validations/forgotPasswordValidation";

export const forgotpasswordRouter = Router();
forgotpasswordRouter.post("/", validateForgotPassword, forgotpassword);
