"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const user_validation_1 = require("../users/user.validation");
const user_controller_1 = require("../users/user.controller");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(user_validation_1.userValidation.userZodSchema), user_controller_1.userController.createUser);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.authValidation.loginZodSchema), auth_controller_1.authController.loginAdmin);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.authValidation.refreshTokenZodSchema), auth_controller_1.authController.refreshToken);
exports.authRoutes = router;
