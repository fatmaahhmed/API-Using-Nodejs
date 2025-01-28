"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedBrands = exports.getBrand = exports.deleteBrand = exports.updateBrand = exports.addBrand = void 0;
const CRUD_1 = require("../services/CRUD");
const slug_1 = require("../middlewares/slug");
const modelName = "brand";
// Wrapper function for addBrand
exports.addBrand = [(0, slug_1.addSlugAttribute)("brand_name"), (0, CRUD_1.add)(modelName)];
exports.updateBrand = (0, CRUD_1.update)(modelName);
exports.deleteBrand = (0, CRUD_1.remove)(modelName);
exports.getBrand = (0, CRUD_1.getOne)(modelName);
exports.getPaginatedBrands = (0, CRUD_1.getMany)(modelName);
