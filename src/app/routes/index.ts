import express from 'express';
import { userRoutes } from '../modules/users/user.route';
import { cowRoutes } from '../modules/cow/cow.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/cow',
    route: cowRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
