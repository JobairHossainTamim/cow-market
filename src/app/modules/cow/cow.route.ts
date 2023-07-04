import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { cowValidation } from './cow.validation';
import { cowController } from './cow.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-cow',
  validateRequest(cowValidation.cowZodSchema),
  cowController.createCow
);

router.get('/', cowController.getAllCow, auth(ENUM_USER_ROLE.Admin));

router.delete('/:id', cowController.deleteCow);

router.patch(
  '/:id',
  validateRequest(cowValidation.cowUpdateZodSchema),
  cowController.updateCow
);

export const cowRoutes = router;
