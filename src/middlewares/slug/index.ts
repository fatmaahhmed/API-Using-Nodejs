import { NextFunction, Response } from "express";

import { ExtendedRequest } from "../../utils/Types/request/request";
import slugify from "slugify";
// Adjust the path as needed

export const addSlugAttribute = (sourceField: string) => {
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {
    if (req.body[sourceField]) {
      req.body.slug = slugify(req.body[sourceField], { lower: true });
    }
    next();
  };
};
