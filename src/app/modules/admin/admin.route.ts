import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { adminValidation } from './admin.validation';
import { adminController } from './admin.controller';


const router = express.Router();


router.post(
    '/create-admin',
    validateRequest(adminValidation.adminZodSchema),
    adminController.createAdmin
);

router.post('/login', validateRequest(adminValidation.loginZodSchema),
    adminController.loginAdmin
)



export const adminRoutes = router;