// Middleware to check validation results

import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

export const validationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
