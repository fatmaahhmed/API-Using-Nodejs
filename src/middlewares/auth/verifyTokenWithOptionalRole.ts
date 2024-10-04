import { NextFunction, Request, Response } from "express";

import { ExtendedRequest } from "../../utils/Types/request/request";
import { JwtPayload } from "./generateToken";
import jwt from "jsonwebtoken";

async function verifyToken(
  token: string,
  privateKey: string
): Promise<JwtPayload> {
  return jwt.verify(token, privateKey) as JwtPayload;
}

export const verifyTokenWithOptionalRole =
  (role?: string) =>
  async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const jwtPrivateKey = process.env.JWTPRIVATEKEY;
    if (!jwtPrivateKey) {
      return res
        .status(500)
        .json({ message: "Internal Server Error: JWT private key is missing" });
    }

    try {
      const decoded = await verifyToken(token, jwtPrivateKey);
      req.body.user_id = decoded.userId;

      if (decoded.role !== role) {
        return res.status(403).json({ message: "Forbidden: Access is denied" });
      }
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
