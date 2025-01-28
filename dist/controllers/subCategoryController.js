"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginatedCategories = exports.getSubCategory = exports.deleteSubCategory = exports.updateSubCategory = exports.addSubCategory = exports.check_parent_id_existence = void 0;
const CRUD_1 = require("../services/CRUD");
const ApiErrorHandler_1 = __importDefault(require("../utils/err/ApiErrorHandler"));
const slug_1 = require("../middlewares/slug");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const handlePrismaerror_1 = require("../utils/err/handlePrismaerror");
const prismaConfig_1 = require("../prisma/config/prismaConfig");
const modelName = "category";
exports.check_parent_id_existence = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { parent_id } = req.body;
    const category = yield prismaConfig_1.prisma.category.findUnique({
        where: {
            category_id: parent_id,
        },
    });
    if (!category) {
        next(new ApiErrorHandler_1.default("Category parent not found ,insert valid ->parent_id<- number", 404));
        return;
    }
    next();
}));
exports.addSubCategory = [
    (0, slug_1.addSlugAttribute)("category_name"),
    (0, CRUD_1.add)(modelName),
];
exports.updateSubCategory = (0, CRUD_1.update)(modelName);
exports.deleteSubCategory = (0, CRUD_1.remove)(modelName);
exports.getSubCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.category_id;
    console.log(`id: ${id}`);
    const parentCategories = yield prismaConfig_1.prisma.category
        .findMany({
        where: {
            category_id: +id,
        },
        select: {
            category_id: true,
            category_name: true,
            // parentCategory: { select: { category_name: true, category_id: true } },
            childCategories: {
                select: {
                    category_name: true,
                    category_id: true,
                },
            },
        },
    })
        .catch((err) => {
        next((0, handlePrismaerror_1.handlePrismaError)(err));
    });
    const totalItems = yield prismaConfig_1.prisma.category.count();
    res.status(200).json({ SubCategory: parentCategories });
}));
exports.getPaginatedCategories = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    if (page < 1 || pageSize < 1) {
        res.status(400).json({ error: "Invalid page or pageSize value" });
    }
    const parentCategories = yield prismaConfig_1.prisma.category
        .findMany({
        where: {
            parent_id: { not: null },
        },
        select: {
            category_id: true,
            category_name: true,
            parentCategory: {
                select: {
                    category_name: true,
                    category_id: true,
                },
            },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
            category_id: "asc",
        },
    })
        .catch((err) => {
        next((0, handlePrismaerror_1.handlePrismaError)(err));
    });
    const totalItems = yield prismaConfig_1.prisma.category.count({
        where: {
            parent_id: { not: null },
        },
    });
    const totalPages = Math.ceil(totalItems / pageSize);
    console.log(totalItems, totalPages);
    if (page > totalPages) {
        next(new ApiErrorHandler_1.default("Page not found", 404));
    }
    res.status(200).json({
        page,
        pageSize,
        totalItems,
        totalPages,
        SubCategory: parentCategories,
    });
}));
// filter categories by
