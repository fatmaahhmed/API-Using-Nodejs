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
exports.getPaginatedCategoriesWithSubCategories = exports.getPaginatedCategories = exports.getCategory = exports.deleteCategory = exports.updateCategory = exports.addCategory = void 0;
const CRUD_1 = require("../services/CRUD");
const ApiErrorHandler_1 = __importDefault(require("../utils/err/ApiErrorHandler"));
const slug_1 = require("../middlewares/slug");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const handlePrismaerror_1 = require("../utils/err/handlePrismaerror");
const prismaConfig_1 = require("../prisma/config/prismaConfig");
const modelName = "category";
exports.addCategory = [(0, slug_1.addSlugAttribute)("category_name"), (0, CRUD_1.add)(modelName)];
exports.updateCategory = (0, CRUD_1.update)(modelName);
exports.deleteCategory = (0, CRUD_1.remove)(modelName);
exports.getCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.category_id, 10);
    let category = {
        where: {
            category_id: id,
            parent_id: null,
        },
        select: {
            category_id: true,
            category_name: true,
        },
    };
    const k = req.originalUrl.split("/")[4];
    console.log(`origin: ${req.originalUrl.split("/")[4]}`);
    if (k === "subCategory") {
        category.select["childCategories"] = {
            select: {
                category_name: true,
                category_id: true,
            },
        };
    }
    try {
        const categories = yield prismaConfig_1.prisma.category.findUnique(category);
        if (!categories) {
            next(new ApiErrorHandler_1.default("Category not found ! OR you must enter ID of main category :)", 404));
        }
        res.status(200).json({ categories });
    }
    catch (err) {
        next((0, handlePrismaerror_1.handlePrismaError)(err));
    }
}));
// getOne(modelName);
exports.getPaginatedCategories = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    if (page < 1 || pageSize < 1) {
        res.status(400).json({ error: "Invalid page or pageSize value" });
    }
    const parentCategories = yield prismaConfig_1.prisma.category
        .findMany({
        where: {
            parent_id: null,
        },
        select: {
            category_id: true,
            category_name: true,
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
    // i need to count category where parent_id is null
    const totalItems = yield prismaConfig_1.prisma.category.count({
        where: {
            parent_id: null,
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
        category: parentCategories,
    });
}));
exports.getPaginatedCategoriesWithSubCategories = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    if (page < 1 || pageSize < 1) {
        res.status(400).json({ error: "Invalid page or pageSize value" });
    }
    const parentCategories = yield prismaConfig_1.prisma.category
        .findMany({
        where: {
            parent_id: null,
        },
        select: {
            category_id: true,
            category_name: true,
            childCategories: {
                select: {
                    category_id: true,
                    category_name: true,
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
    // i need to count category where parent_id is null
    const totalItems = yield prismaConfig_1.prisma.category.count({
        where: {
            parent_id: null,
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
        category: parentCategories,
    });
}));
// You are in Test branch
