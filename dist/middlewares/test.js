"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customMiddleware = void 0;
// Middleware function that accepts parameters
const customMiddleware = (param = "ay haga") => {
    return (req, res, next) => {
        console.log("Parameter passed to middleware:", param);
        if (param === "special") {
            console.log("Special parameter detected!");
        }
        next();
    };
};
exports.customMiddleware = customMiddleware;
