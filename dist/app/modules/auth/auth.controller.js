"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.JWT_SECRET = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const user_model_1 = require("../users/user.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.JWT_SECRET = 'your-secret-key';
const REFRESH_TOKEN_SECRET = 'your-refresh-token-secret';
const ACCESS_TOKEN_EXPIRY = '1h';
const loginAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { phoneNumber, password } = req.body;
    const admin = await user_model_1.User.findOne({ phoneNumber });
    if (!admin) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Phone number does not exist');
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, admin.password);
    if (!isPasswordValid) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Incorrect password');
    }
    const token = jsonwebtoken_1.default.sign({ _id: admin._id, role: admin.role }, exports.JWT_SECRET, { expiresIn: '15d' });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User logged in successfully',
        data: {
            accessToken: token,
        },
    });
});
const refreshToken = (0, catchAsync_1.default)(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Missing refresh token');
    }
    jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid refresh token' });
        }
        const accessToken = generateAccessToken(decoded._id, decoded.role);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'New access token generated successfully!',
            data: {
                accessToken
            },
        });
    });
});
const generateAccessToken = (userId, role) => {
    return jsonwebtoken_1.default.sign({ _id: userId, role }, exports.JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
};
exports.authController = {
    loginAdmin,
    refreshToken
};
