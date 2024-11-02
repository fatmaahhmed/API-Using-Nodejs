import { NextFunction, Request, Response } from "express";

import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

export const validationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("validationErrors here in validatorMiddleware file");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
