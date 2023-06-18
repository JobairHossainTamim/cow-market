"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const cow_services_1 = require("./cow.services");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const cow_const_1 = require("./cow.const");
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const createCow = (0, catchAsync_1.default)(async (req, res) => {
    const { ...cowData } = req.body;
    const result = await cow_services_1.cowService.createCow(cowData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cow created successfully!',
        data: result,
    });
});
const getAllCow = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, cow_const_1.cowFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = await cow_services_1.cowService.getAllCows(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Retrieve Cow successfully!',
        meta: result.meta,
        data: result.data.length > 0 ? result.data[0] : null,
    });
});
const getSingleCows = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await cow_services_1.cowService.getSingleCow(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cow retrieved successfully !',
        data: result,
    });
});
const deleteCow = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await cow_services_1.cowService.deleteCow(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cow deleted successfully !',
        data: result,
    });
});
const updateCow = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await cow_services_1.cowService.updateCow(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cow updated successfully !',
        data: result,
    });
});
exports.cowController = {
    createCow,
    getAllCow,
    getSingleCows,
    updateCow,
    deleteCow,
};
