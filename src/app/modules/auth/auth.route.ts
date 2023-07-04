import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { userValidation } from '../users/user.validation';
import { userController } from '../users/user.controller';
import { authController } from './auth.controller';



const router = express.Router();


router.post('/signup', validateRequest(userValidation.userZodSchema),
    userController.createUser
)
router.post(
    '/login',
    validateRequest(authValidation.loginZodSchema),
    authController.loginAdmin
);

router.post(
    '/refresh-token',
    validateRequest(authValidation.refreshTokenZodSchema),
    authController.refreshToken
);



export const authRoutes = router;