"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrors = void 0;
const express_validator_1 = require("express-validator");
const validationErrors = (req, res, next) => {
    console.log("validationErrors here in validatorMiddleware file");
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
exports.validationErrors = validationErrors;
