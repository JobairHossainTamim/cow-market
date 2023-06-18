"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowService = void 0;
const cow_model_1 = require("./cow.model");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const cow_const_1 = require("./cow.const");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createCow = async (payload) => {
    const result = await cow_model_1.Cow.create(payload);
    return result;
};
const getAllCows = async (filters, paginationOptions) => {
    const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cow_const_1.cowSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (minPrice) {
        andConditions.push({
            price: {
                $gte: minPrice,
            },
        });
    }
    if (maxPrice) {
        andConditions.push({
            price: {
                $lte: maxPrice,
            },
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = await cow_model_1.Cow.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await cow_model_1.Cow.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const getSingleCow = async (_id) => {
    const result = await cow_model_1.Cow.findOne({ _id });
    return result;
};
const deleteCow = async (_id) => {
    const result = await cow_model_1.Cow.findByIdAndDelete(_id);
    return result;
};
const updateCow = async (_id, payload) => {
    const isExist = await cow_model_1.Cow.findOne({ _id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow not found !');
    }
    const result = await cow_model_1.Cow.findOneAndUpdate({ _id: _id }, payload, {
        new: true,
    });
    return result;
};
exports.cowService = {
    createCow,
    getAllCows,
    getSingleCow,
    deleteCow,
    updateCow,
};
