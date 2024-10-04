import { NextFunction, Request, Response } from "express";

import { Role } from "./types";
import e from "express";

// extend the Request object to include a user_id property
export interface ExtendedRequest extends Request {
  user_id?: string;
  role?: string;
  email?: string;
  token?: string;
}
