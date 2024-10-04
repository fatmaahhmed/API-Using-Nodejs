import { NextFunction, Request, Response } from "express";

import { ExtendedRequest } from "../../utils/Interfaces";
import jwt from "jsonwebtoken";

require("dotenv").config();
export type JwtPayload = {
  role: string | "user";
  email: string;
  userId: number;
};

export const generateAuthToken = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const privateKey = process.env.JWTPRIVATEKEY; // Make sure this matches your .env file
  if (!privateKey) {
    throw new Error("Private key is not defined in environment variables.");
  }

  const payload: JwtPayload = {
    role: req.body.role,
    email: req.body.email,
    userId: +req.params.user_id,
  };
  console.log(`payload: ${JSON.stringify(payload)}`);
  const token = jwt.sign(payload, privateKey, { expiresIn: "5" });
  req.token = token;
};
