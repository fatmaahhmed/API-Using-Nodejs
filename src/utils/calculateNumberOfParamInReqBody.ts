import { Request } from "express";

export const calculateNumberOfParamInReqBody = (req: Request): number => {
  const paramCount = Object.keys(req.body).length;
  console.log("Object.keys(req.body).length", paramCount);
  return paramCount;
};
