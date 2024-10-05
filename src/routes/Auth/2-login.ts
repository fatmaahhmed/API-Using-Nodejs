import { Router } from "express";
import { generateAuthToken } from "../../middlewares/auth/generateToken";
import { login } from "../../controllers/auth/2-login";
import { validateLogin } from "../../utils/Validations/Auth/LoginValidator";
export const loginRouter = Router();
loginRouter.post(
  "/",
  // validateLogin,
  login,
  generateAuthToken
);
