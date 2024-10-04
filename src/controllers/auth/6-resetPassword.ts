import e, { NextFunction, Request, Response } from "express";
import { findUserByEmail, updateUser } from "../../services/UserAndAdmin";

import { ExtendedRequest } from "../../utils/Types/request/request";
import { hashPassword } from "../../utils/hashPassword";

export async function resetPassword(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  let user: any = await findUserByEmail(req.body.email);
  if (user.verified) {
    return res
      .status(400)
      .json({ message: "User has already verified their account" });
  }
  if (user.verification_code_expires < new Date() && !user.verified) {
    return res.status(400).json({ message: "Verification code has expired" });
  }
  const hashedPassword = await hashPassword(req.body.password);
  await updateUser(user.user_id, {
    password: hashedPassword,
    verified: true,
    verificationCode: "",
    verification_code_expires: new Date(),
  });
  next();
  res
    .status(200)
    .json({ message: "Password changed successfully", token: req.token });
}
