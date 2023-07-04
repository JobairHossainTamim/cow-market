import express from 'express';
import { userRoutes } from '../modules/users/user.route';
import { cowRoutes } from '../modules/cow/cow.route';
import { adminRoutes } from '../modules/admin/admin.route';
import { authRoutes } from '../modules/auth/auth.route';

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
  {
    path: '/admins',
    route: adminRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  }

];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
