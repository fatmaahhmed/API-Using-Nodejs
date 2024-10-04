import { RequestHandler } from "express";

export const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
  const startTime = Date.now(); // Record the start time

  console.log(`
    req.method--->, ${req.method}
    req.url--->${req.url}
    req.originalUrl-->${req.originalUrl}
    req.params-->${req.params.user_id}
    req.query-->${req.query}
    req.body-->${req.body}
    req.headers-->${req.headers}`);

  // Extract token from the 'Authorization' header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token found in request");
  } else {
    const token = authHeader.split(" ")[1];
    console.log("Token:", token);
  }
  console.log("Request received");

  // Attach a function to the response object to log the duration
  res.on("finish", () => {
    const duration = Date.now() - startTime; // Calculate the duration
    console.log(`Request took ${duration}ms`);
  });

  next();
};
