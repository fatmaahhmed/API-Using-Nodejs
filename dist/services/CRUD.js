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
exports.getMany = exports.getOne = exports.remove = exports.update = exports.add = void 0;
const ApiErrorHandler_1 = __importDefault(require("../utils/err/ApiErrorHandler"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const handlePrismaerror_1 = require("../utils/err/handlePrismaerror");
const prismaConfig_1 = require("../prisma/config/prismaConfig");
const getPrismaModel = (modelName) => {
    return prismaConfig_1.prisma[modelName];
};
const createCrudHandler = (modelName, operation) => {
    return (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const model = getPrismaModel(modelName);
        const idField = `${modelName.toString()}_id`;
        const user_id = +req.params.user_id;
        let result;
        try {
            switch (operation) {
                case "add":
                    const a = req.body;
                    console.log(JSON.stringify(a));
                    console.log(req.body);
                    console.log(req.params.user_id);
                    // console.log(modelName.toString());
                    // console.log(model);
                    result = yield model.create({
                        data: Object.assign(Object.assign({}, req.body), { user_id: user_id }),
                    });
                    res.status(201).json({
                        message: `${modelName.toString()} added successfully`,
                        [modelName]: result,
                        token: req.token,
                    });
                    break;
                case "update":
                    const model_id = `${modelName.toString()}_id`;
                    console.log("req.params[idField]", req.params[idField]);
                    console.log("model_id", model_id);
                    const modelData = yield model.findUnique({
                        where: {
                            [idField]: +req.params[idField],
                            user_id: user_id,
                        },
                    });
                    if (!modelData) {
                        next(new ApiErrorHandler_1.default("Row not found", 404));
                    }
                    // update specific part of selected data in a variable
                    const updatedFields = req.body;
                    const updateData = Object.assign(Object.assign({}, modelData), updatedFields);
                    console.log("updateData", JSON.stringify(updateData));
                    result = yield model.update({
                        data: updateData,
                        where: {
                            [idField]: +req.params[idField],
                            user_id: user_id,
                        },
                    });
                    if (!result) {
                        next(new ApiErrorHandler_1.default("Row not found", 404));
                    }
                    res.status(200).json({
                        message: `${modelName.toString()} updated successfully`,
                        [modelName]: result,
                    });
                    break;
                case "remove":
                    console.log("req.params[idField]", req.params[idField]);
                    console.log("user_id: user_id", user_id);
                    const DeletedData = yield model.findUnique({
                        where: {
                            [idField]: +req.params[idField],
                            user_id: user_id,
                        },
                    });
                    if (!DeletedData) {
                        next(new ApiErrorHandler_1.default("Row not found", 404));
                        return;
                    }
                    result = yield model.delete({
                        where: {
                            [idField]: +req.params[idField],
                            user_id: user_id,
                        },
                    });
                    res.status(200).json({
                        message: `${modelName.toString()} deleted successfully`,
                        [modelName]: result,
                    });
                    break;
                case "getOne":
                    result = yield model.findUnique({
                        where: { [idField]: +req.params[idField] },
                    });
                    if (!result) {
                        next(new ApiErrorHandler_1.default("Row not found", 404));
                    }
                    res.status(200).json({ [modelName]: result });
                    break;
                case "getMany":
                    // TODO: add pagination
                    const page = parseInt(req.query.page) || 1;
                    const pageSize = parseInt(req.query.pageSize) || 10;
                    console.log(page, pageSize);
                    if (page < 1 || pageSize < 1) {
                        res.status(400).json({ error: "Invalid page or pageSize value" });
                    }
                    // TODO:add filtration
                    const filterObject = Object.assign({}, req.query);
                    delete filterObject.page;
                    delete filterObject.pageSize;
                    console.log("filterObject", filterObject);
                    // make value of filterObject to be number
                    for (const key in filterObject) {
                        console.log("key", key);
                        if (filterObject.hasOwnProperty(key)) {
                            const value = filterObject[key];
                            if (typeof value === "string" && !isNaN(+value)) {
                                filterObject[key] = +value;
                                console.log("filterObject[key]", filterObject[key]);
                            }
                        }
                    }
                    console.log("filterObject", filterObject);
                    const filters = {};
                    if (filterObject.minRating) {
                        filters.rating = { gte: filterObject.minRating };
                    }
                    if (filterObject.maxRating) {
                        filters.rating = { lte: filterObject.maxRating };
                    }
                    if (filterObject.minPrice) {
                        filters.price = { gte: filterObject.minPrice };
                    }
                    if (filterObject.maxPrice) {
                        filters.price = { lte: filterObject.maxPrice };
                    }
                    if (filterObject.minRating) {
                        filters.rating = { gte: filterObject.minRating };
                    }
                    if (filterObject.maxRating) {
                        filters.rating = { lte: filterObject.maxRating };
                    }
                    // brand
                    if (filterObject.brand_name) {
                        filters.brand_name = filterObject.brand_name;
                    }
                    // category
                    if (filterObject.category) {
                        filters.category_id = filterObject.category;
                    }
                    // color
                    if (filterObject.color) {
                        filters.color = filterObject.color;
                    }
                    // stock
                    if (filterObject.in_stock) {
                        filters.in_stock = filterObject.in_stock
                            ? Boolean(1)
                            : Boolean(0);
                    }
                    console.log("filters", filters);
                    // TODO: add sorting
                    let sort = req.query.sort;
                    console.log("sort", req.query.sort);
                    let sortFields = {};
                    if (sort) {
                        sort = sort.split(",");
                        console.log("sort", sort);
                    }
                    if (sort && sort[0].startsWith("-")) {
                        // remove - from sort[0]
                        sort[0] = sort[0].substring(1);
                        console.log("sort -");
                        for (const s of sort) {
                            sortFields[s] = "desc";
                        }
                        // make this array of objects
                        sort = {
                            [sort[0]]: "desc",
                        };
                    }
                    else {
                        console.log("sort +");
                        sort = {
                            [sort.substring(1)]: "des",
                        };
                    }
                    console.log("sort", sort);
                    // TODO: add fields
                    let fields = req.query.fields;
                    const items = yield model.findMany({
                        where: Object.assign({}, filters),
                        skip: (page - 1) * pageSize,
                        take: pageSize,
                        orderBy: Object.assign({}, sortFields),
                    });
                    // TODO: add sorting
                    // TODO: add search
                    // TODO: add select
                    // TODO: add include
                    // TODO: add aggregate
                    // TODO: add groupBy
                    // TODO: add having
                    //
                    const totalItems = yield model.count();
                    const totalPages = Math.ceil(totalItems / pageSize);
                    console.log(totalItems, totalPages);
                    if (page > totalPages) {
                        next(new ApiErrorHandler_1.default("Page not found", 404));
                    }
                    res.status(200).json({
                        page,
                        pageSize,
                        totalItems,
                        totalPages: Math.ceil(totalItems / pageSize),
                        modelName: items,
                    });
                    break;
            }
        }
        catch (error) {
            // log field which may cause error
            console.log("error----------------------", error);
            next((0, handlePrismaerror_1.handlePrismaError)(error));
        }
    }));
};
const add = (modelName) => createCrudHandler(modelName, "add");
exports.add = add;
const update = (modelName) => createCrudHandler(modelName, "update");
exports.update = update;
const remove = (modelName) => createCrudHandler(modelName, "remove");
exports.remove = remove;
const getOne = (modelName) => createCrudHandler(modelName, "getOne");
exports.getOne = getOne;
const getMany = (modelName) => createCrudHandler(modelName, "getMany");
exports.getMany = getMany;
