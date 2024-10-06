import { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

// أضفنا RequestHandler
import express from "express";
import { validationErrors } from "../../../middlewares/validation/validatorMiddleware";

const app = express();

app.post(
  "/submit",
  [
    body("name").notEmpty().withMessage("Name is required"),

    body("age").custom((value, { req }) => {
      if (req.body.name === "John") {
        if (value < 18) {
          throw new Error("Age must be greater than 18 if your name is John");
        }
      }

      return true;
    }),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    res.send("Success");
    return;
  }
);
