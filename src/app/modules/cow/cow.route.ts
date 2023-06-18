import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { cowValidation } from './cow.validation';
import { cowController } from './cow.controller';
const router = express.Router();

router.post(
  '/create-cow',
  validateRequest(cowValidation.cowZodSchema),
  cowController.createCow
);

router.get('/', cowController.getAllCow);

router.delete('/:id', cowController.deleteCow);

router.patch(
  '/:id',
  validateRequest(cowValidation.cowUpdateZodSchema),
  cowController.updateCow
);

export const cowRoutes = router;
