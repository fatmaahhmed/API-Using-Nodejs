//reload env variables
import dotenv from "dotenv";
import { validationErrors } from "../validation/validatorMiddleware";
dotenv.config();
export const globalError = (err: any, req: any, res: any, next: any) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.error(`Error details: ${err.stack}`);
  console.log("------------------------------------------------------------");
  console.log(err.name);
  console.log("------------------------------------------------------------");
  console.log(err.message);
  if (process.env.NODE_ENV == "development") {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,

      stack: err.stack,
    });
  } else {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};
