import { NextFunction, Request, Response } from "express";

import { ExtendedRequest } from "../utils/Types/request/request";

// Middleware function that accepts parameters
export const customMiddleware = (param: string = "ay haga") => {
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {
    console.log("Parameter passed to middleware:", param);

    if (param === "special") {
      console.log("Special parameter detected!");
    }

    next();
  };
};
