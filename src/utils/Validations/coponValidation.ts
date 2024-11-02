import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

import { CustomValidator } from "express-validator";
import { ExtendedRequest } from "../Types/request/request";
import { calculateNumberOfParamInReqBody } from "../calculateNumberOfParamInReqBody";
import { validationErrors } from "../../middlewares/validation/validatorMiddleware";

// copon_id;
// copon_code;
// discount;
// start_date;
// end_date;
export const validatecopon = [
  body("copon_code")
    .notEmpty()
    .isString()
    .withMessage("copon code is required"),
  body("discount").notEmpty().isInt().withMessage("discount is required"),
  // make custom function to check if the date is valid and convert it to date
  body("start_date")
    .notEmpty()
    .withMessage("start date is required")
    .isString()
    .custom((value: any, { req }) => {
      console.log("Received start_date value:", value);
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error("Start date is invalid");
      }
      req.body.start_date = date.toISOString();
      console.log("Transformed start_date:", req.body.start_date);
      return true;
    }),

  body("end_date")
    .notEmpty()
    .isString()
    .withMessage("end date is required")
    .custom((value: any, { req }) => {
      console.log("Received end_date value:", value);

      // Try to parse the date
      const date = new Date(value);

      // Validate the date
      if (isNaN(date.getTime())) {
        throw new Error("End date is invalid");
      }

      // Convert to ISO string
      req.body.end_date = date.toISOString();
      console.log("Transformed end_date:", req.body.end_date);
      return true;
    }),
  param("user_id")
    .notEmpty()
    .withMessage("user_id is required")
    .isInt()
    .withMessage("user_id must be an integer"),
  validationErrors,
];

export const validatecoponUpdate = [
  (req: Request, res: Response, next: NextFunction) => {
    const paramCount = calculateNumberOfParamInReqBody(req);
    if (paramCount < 1) {
      return res.status(400).json({
        error: `At least 1 parameters are required in the request body : copon_code, discount, start_date, end_date 
        All in string format`,
      });
    }
    next();
  },
  // body("copon_name")
  //   .notEmpty()
  //   .isString()
  //   .withMessage("copon name must be a string"),
  param("copon_id")
    .notEmpty()
    .withMessage("copon_id is required")
    .isInt()
    .withMessage("copon_id must be an integer"),
  param("user_id")
    .notEmpty()
    .withMessage("user_id is required")
    .isInt()
    .withMessage("user_id must be an integer"),
  validationErrors,
];

export const validateDeletecopon = [
  param("user_id")
    .notEmpty()
    .withMessage("user_id is required")
    .isInt()
    .withMessage("user_id must be an integer"),
  validationErrors,
];
