import { Router } from "express";
import { generateAuthToken } from "../../middlewares/auth/generateToken";
import { signUp } from "../../controllers/auth/1-signup";
import { validateSignUp } from "../../utils/Validations/Auth/SignUpValidator";
export const signupRouter = Router();
signupRouter.post("/", validateSignUp, signUp, generateAuthToken);
