"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNumberOfParamInReqBody = void 0;
const calculateNumberOfParamInReqBody = (req) => {
    const paramCount = Object.keys(req.body).length;
    console.log("Object.keys(req.body).length", paramCount);
    return paramCount;
};
exports.calculateNumberOfParamInReqBody = calculateNumberOfParamInReqBody;
