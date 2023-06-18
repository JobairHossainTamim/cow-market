"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_const_1 = require("./user.const");
const user_model_1 = require("./user.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createUser = async (payload) => {
    const result = await user_model_1.User.create(payload);
    return result;
};
const getAllUsers = async (filters, paginationOptions) => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: user_const_1.userSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
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
    const result = await user_model_1.User.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = await user_model_1.User.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
const getSingleUser = async (_id) => {
    const result = await user_model_1.User.findOne({ _id });
    return result;
};
const deleteUser = async (_id) => {
    const result = await user_model_1.User.findByIdAndDelete(_id);
    return result;
};
const updateUser = async (_id, payload) => {
    const isExist = await user_model_1.User.findOne({ _id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
    }
    const result = await user_model_1.User.findOneAndUpdate({ _id: _id }, payload, {
        new: true,
    });
    return result;
};
exports.userService = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
};
