import { customMiddleware } from "../middlewares/test";
import express from "express";

const test = express.Router();

// Route using the middleware with a parameter
test.get("/test", customMiddleware("special"), (req, res) => {
  res.send("Middleware with parameter executed!");
});

export default test;
