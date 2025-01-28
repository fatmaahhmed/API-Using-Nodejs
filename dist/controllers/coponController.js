"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedCopons = exports.getCopon = exports.deleteCopon = exports.updateCopon = exports.addCopon = void 0;
const CRUD_1 = require("../services/CRUD");
const slug_1 = require("../middlewares/slug");
const modelName = "copon";
// Wrapper function for addCopon
exports.addCopon = [(0, slug_1.addSlugAttribute)("copon_name"), (0, CRUD_1.add)(modelName)];
exports.updateCopon = (0, CRUD_1.update)(modelName);
exports.deleteCopon = (0, CRUD_1.remove)(modelName);
exports.getCopon = (0, CRUD_1.getOne)(modelName);
exports.getPaginatedCopons = (0, CRUD_1.getMany)(modelName);
