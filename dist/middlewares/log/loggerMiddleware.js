"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLoggerMiddleware = void 0;
const requestLoggerMiddleware = (req, res, next) => {
    const startTime = Date.now(); // Record the start time
    // Function to create a box around the log
    const logInBox = (message) => {
        const border = "+-------------------------------------------------------------------------------------------------------------------+";
        const padding = "|                                                                                                                  |";
        const content = message
            .split("\n\n")
            .map((line) => `| ${line.padEnd(35)} |`);
        console.log(border);
        console.log(padding);
        content.forEach((line) => console.log(line));
        console.log(padding);
        console.log(border);
    };
    // Log request details
    logInBox(`
    Request Details:
    Method: ${req.method}
    URL: ${req.url}
    Original URL: ${req.originalUrl}
  `);
    // Extract token from the 'Authorization' header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        logInBox("No token found in request");
    }
    else {
        const token = authHeader.split(" ")[1];
        logInBox(`
      Token Details:
      Token: ${token}
    `);
    }
    console.log("Request received");
    // Attach a function to the response object to log the duration
    res.on("finish", () => {
        const duration = Date.now() - startTime; // Calculate the duration
        logInBox(`Request took ${duration}ms`);
    });
    next();
};
exports.requestLoggerMiddleware = requestLoggerMiddleware;
