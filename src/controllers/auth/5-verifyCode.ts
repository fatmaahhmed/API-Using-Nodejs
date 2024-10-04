import { NextFunction, Request, Response } from "express";
import { findUserByEmail, updateUser } from "../../services/UserAndAdmin";

import ApiError from "../../utils/err/ApiErrorHandler";
import { ExtendedRequest } from "../../utils/Types/request/request";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
// import { findAdminEmail } from "../../services/adminService";
import { generateAuthToken } from "../../middlewares/auth/generateToken";

// check if the code is correct
export const verifyCode = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    let user: any = await findUserByEmail(req.body.email);

    const ismatch = await bcrypt.compare(req.body.code, user.verificationCode);
    if (!ismatch) {
      throw new ApiError("Invalid code", 401);
    }
    if (new Date() > user.verification_code_expires) {
      throw new ApiError("Code expired", 401);
    }
    await updateUser(user.user_id, {
      verified: false,
    });
    // res.status(200).json({
    //   message: "Code verified",
    //   token: req.token,
    // });
    next();
  }
);
