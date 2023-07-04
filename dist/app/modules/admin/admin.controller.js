"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = exports.JWT_SECRET = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const admin_model_1 = require("./admin.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.JWT_SECRET = 'your-secret-key';
const createAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { password, role, name, phoneNumber, address } = req.body;
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const admin = await admin_model_1.Admin.create({
        password: hashedPassword,
        role,
        name,
        phoneNumber,
        address,
    });
    const { _id, role: adminRole, name: adminName, phoneNumber: adminPhoneNumber, address: adminAddress } = admin;
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin created successfully!',
        data: {
            _id,
            role: adminRole,
            name: adminName,
            phoneNumber: adminPhoneNumber,
            address: adminAddress,
        },
    });
});
const loginAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { phoneNumber, password } = req.body;
    const admin = await admin_model_1.Admin.findOne({ phoneNumber });
    if (!admin) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Phone number does not exist');
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, admin.password);
    if (!isPasswordValid) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Password does not exist');
    }
    const token = jsonwebtoken_1.default.sign({ _id: admin._id, role: admin.role }, exports.JWT_SECRET, { expiresIn: '15d' });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin created successfully!',
        data: {
            accessToken: token,
        },
    });
});
exports.adminController = {
    createAdmin,
    loginAdmin
};
