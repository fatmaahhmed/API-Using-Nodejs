import { NextFunction, Request, Response } from "express";

import { ExtendedRequest } from "../../utils/Types/request/request";
import { JwtPayload } from "./generateToken";
import jwt from "jsonwebtoken";

// Helper function to verify token
async function verifyToken(
  token: string,
  privateKey: string
): Promise<JwtPayload> {
  return jwt.verify(token, privateKey) as JwtPayload;
}

// Properly typed middleware
export const verifyTokenWithOptionalRole = (role?: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }
    const jwtPrivateKey = process.env.JWTPRIVATEKEY;
    if (!jwtPrivateKey) {
      res.status(500).json({
        message: "Internal Server Error: JWT private key is missing",
      });
      return;
    }

    try {
      const decoded = await verifyToken(token, jwtPrivateKey);
      if (role && decoded.role !== role) {
        res.status(403).json({ message: "Forbidden: Access is denied" });
        return;
      }
      req.params.user_id = decoded.user_id.toString();
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Unauthorized: Invalid token" });
      return;
    }
  };
};
