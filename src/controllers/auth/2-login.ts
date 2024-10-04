import { NextFunction, Request, Response } from "express";

import ApiError from "../../utils/err/ApiErrorHandler";
import { ExtendedRequest } from "../../utils/Types/request/request";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { findUserByEmail } from "../../services/UserAndAdmin";

export const login = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError("Invalid email or password", 401);
    }
    req.role = user.role;
    req.params.user_id = user.user_id.toString();
    next();
    res.status(200).json({ message: "Login successful", token: req.token });
  }
);
