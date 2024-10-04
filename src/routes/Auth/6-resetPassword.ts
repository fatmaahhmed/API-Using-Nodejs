import { Router } from "express";
import { generateAuthToken } from "../../middlewares/auth/generateToken";
import { resetPassword } from "../../controllers/auth/6-resetPassword";
import { verifyCode } from "../../controllers/auth/5-verifyCode";
import { verifyTokenWithOptionalRole } from "../../middlewares/auth/verifyTokenWithOptionalRole";
export const resetPasswordRouter = Router();
resetPasswordRouter.post("/", verifyCode, resetPassword, generateAuthToken);
