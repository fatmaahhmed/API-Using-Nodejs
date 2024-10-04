import { NextFunction, Request, Response } from "express";
import { findUserByEmail, updateUser } from "../../services/UserAndAdmin";

import ApiError from "../../utils/err/ApiErrorHandler";
import { ExtendedRequest } from "../../utils/Types/request/request";
import { SendingCode } from "./4-sendCodeViaMail";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

export const forgotpassword = asyncHandler(
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    let user: any = await findUserByEmail(req.body.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    const verificationCode = Math.floor(1000 + Math.random() * 9000);
    const hashedCode = await bcrypt.hash(verificationCode.toString(), 10);
    console.log("hashedCode", hashedCode);
    console.log("verificationCode", verificationCode);
    const verifiedLastValue = user.verified;
    let updateData = {
      verificationCode: hashedCode,
      verification_code_expires: new Date(Date.now() + 5 * 60 * 1000),
      verified: false,
    };
    await updateUser(user.user_id, updateData);
    try {
      await SendingCode(verificationCode, req.body.email);
      res.status(200).json({ message: "Verification code sent" });
    } catch (error) {
      updateData = {
        verificationCode: "",
        verification_code_expires: new Date(),
        verified: verifiedLastValue,
      };
      await updateUser(user.user_id, updateData);
      throw new ApiError("Error sending verification code", 500);
    }
  }
);
