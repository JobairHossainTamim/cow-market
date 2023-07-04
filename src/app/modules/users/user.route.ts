import express from 'express';
import { userValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userValidation.userZodSchema),
  userController.createUser
);
router.get('/:id', userController.getSingleUsers,
  auth(ENUM_USER_ROLE.Admin, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.Buyer)
);

router.delete('/:id', userController.deleteUser);

router.get('/', userController.getAllUser, auth(ENUM_USER_ROLE.Admin));

router.patch(
  '/:id',
  validateRequest(userValidation.userUpdateZodSchema),
  userController.updateUser
);

export const userRoutes = router;
