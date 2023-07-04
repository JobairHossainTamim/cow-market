"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cow_validation_1 = require("./cow.validation");
const cow_controller_1 = require("./cow.controller");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-cow', (0, validateRequest_1.default)(cow_validation_1.cowValidation.cowZodSchema), cow_controller_1.cowController.createCow);
router.get('/', cow_controller_1.cowController.getAllCow, (0, auth_1.default)(user_1.ENUM_USER_ROLE.Admin));
router.delete('/:id', cow_controller_1.cowController.deleteCow);
router.patch('/:id', (0, validateRequest_1.default)(cow_validation_1.cowValidation.cowUpdateZodSchema), cow_controller_1.cowController.updateCow);
exports.cowRoutes = router;
