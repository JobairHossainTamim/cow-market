"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_validation_1 = require("./admin.validation");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.adminValidation.adminZodSchema), admin_controller_1.adminController.createAdmin);
router.post('/login', (0, validateRequest_1.default)(admin_validation_1.adminValidation.loginZodSchema), admin_controller_1.adminController.loginAdmin);
exports.adminRoutes = router;
