import bodyParser from "body-parser";
import express from "express";
import { requestLoggerMiddleware } from "../log/loggerMiddleware";
export const applyMiddlewares = (app: express.Application) => {
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(requestLoggerMiddleware);
};
