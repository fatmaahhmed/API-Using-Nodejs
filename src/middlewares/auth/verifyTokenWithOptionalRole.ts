import { NextFunction, Request, Response } from "express";

import ApiError from "../../utils/err/ApiErrorHandler";
import { ExtendedRequest } from "../../utils/Types/request/request";
import { JwtPayload } from "./generateToken";
import jwt from "jsonwebtoken";

// Helper function to verify token
async function decodeToken(
  token: string,
  privateKey: string
): Promise<JwtPayload> {
  try {
    const jsonwt = jwt.verify(token, privateKey) as JwtPayload;
    return jsonwt;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new ApiError("Token verification failed", 401);
  }
}

// Properly typed middleware
export const isAuthenticated = (role: string = "not defined") => {
  return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      console.log("Role passed to isAuthenticated:", role);
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
      const decoded = await decodeToken(token, jwtPrivateKey);
      console.log("decoded Token-->", decoded);
      if (role == "not defined") {
        role = decoded.role;
      }
      if (decoded.role !== role) {
        res.status(403).json({ message: "Forbidden: Access is denied" });
        return;
      }
      req.params.user_id = decoded.user_id.toString();
      req.role = decoded.role;
      console.log("req.params.user_id-->", req.params.user_id);
      console.log("req.role-->", req.role);
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Unauthorized: Invalid token" });
      return;
    }
  };
};
