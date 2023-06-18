import express from 'express';
import { userValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userValidation.userZodSchema),
  userController.createUser
);
router.get('/:id', userController.getSingleUsers);

router.delete('/:id', userController.deleteUser);

router.get('/', userController.getAllUser);

router.patch(
  '/:id',
  validateRequest(userValidation.userUpdateZodSchema),
  userController.updateUser
);

export const userRoutes = router;
