"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeletecopon = exports.validatecoponUpdate = exports.validatecopon = void 0;
const express_validator_1 = require("express-validator");
const calculateNumberOfParamInReqBody_1 = require("../calculateNumberOfParamInReqBody");
const validatorMiddleware_1 = require("../../middlewares/validation/validatorMiddleware");
// copon_id;
// copon_code;
// discount;
// start_date;
// end_date;
exports.validatecopon = [
    (0, express_validator_1.body)("copon_code")
        .notEmpty()
        .isString()
        .withMessage("copon code is required"),
    (0, express_validator_1.body)("discount").notEmpty().isInt().withMessage("discount is required"),
    // make custom function to check if the date is valid and convert it to date
    (0, express_validator_1.body)("start_date")
        .notEmpty()
        .withMessage("start date is required")
        .isString()
        .custom((value, { req }) => {
        console.log("Received start_date value:", value);
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new Error("Start date is invalid");
        }
        req.body.start_date = date.toISOString();
        console.log("Transformed start_date:", req.body.start_date);
        return true;
    }),
    (0, express_validator_1.body)("end_date")
        .notEmpty()
        .isString()
        .withMessage("end date is required")
        .custom((value, { req }) => {
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
    (0, express_validator_1.param)("user_id")
        .notEmpty()
        .withMessage("user_id is required")
        .isInt()
        .withMessage("user_id must be an integer"),
    validatorMiddleware_1.validationErrors,
];
exports.validatecoponUpdate = [
    (req, res, next) => {
        const paramCount = (0, calculateNumberOfParamInReqBody_1.calculateNumberOfParamInReqBody)(req);
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
    (0, express_validator_1.param)("copon_id")
        .notEmpty()
        .withMessage("copon_id is required")
        .isInt()
        .withMessage("copon_id must be an integer"),
    (0, express_validator_1.param)("user_id")
        .notEmpty()
        .withMessage("user_id is required")
        .isInt()
        .withMessage("user_id must be an integer"),
    validatorMiddleware_1.validationErrors,
];
exports.validateDeletecopon = [
    (0, express_validator_1.param)("user_id")
        .notEmpty()
        .withMessage("user_id is required")
        .isInt()
        .withMessage("user_id must be an integer"),
    validatorMiddleware_1.validationErrors,
];
