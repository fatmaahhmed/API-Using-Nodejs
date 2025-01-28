"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSlugAttribute = void 0;
const slugify_1 = __importDefault(require("slugify"));
// Adjust the path as needed
const addSlugAttribute = (sourceField) => {
    return (req, res, next) => {
        if (req.body[sourceField]) {
            req.body.slug = (0, slugify_1.default)(req.body[sourceField], { lower: true });
        }
        next();
    };
};
exports.addSlugAttribute = addSlugAttribute;
