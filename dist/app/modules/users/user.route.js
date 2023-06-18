"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/create-user', (0, validateRequest_1.default)(user_validation_1.userValidation.userZodSchema), user_controller_1.userController.createUser);
router.get('/:id', user_controller_1.userController.getSingleUsers);
router.delete('/:id', user_controller_1.userController.deleteUser);
router.get('/', user_controller_1.userController.getAllUser);
router.patch('/:id', (0, validateRequest_1.default)(user_validation_1.userValidation.userUpdateZodSchema), user_controller_1.userController.updateUser);
exports.userRoutes = router;
