import httpStatus from 'http-status';
import { IUser } from './user.interface';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { userService } from './user.services';
import { Request, Response } from 'express';
import pick from '../../../shared/pick';
import { userFilterableFields } from './user.const';
import { paginationFields } from '../../../constants/pagination';
import bcrypt from 'bcrypt';



const createUser = catchAsync(async (req: Request, res: Response) => {
  const { password, ...userData } = req.body;

  // Hash the password using bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Update the userData object with the hashed password
  const updatedUserData = {
    ...userData,
    password: hashedPassword,
  };

  const result = await userService.createUser(updatedUserData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });

});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await userService.getAllUsers(filters, paginationOptions);
  sendResponse<IUser | undefined | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Users',
    meta: result.meta,
    data: result.data.length > 0 ? result.data[0] : null,
  });
});

const getSingleUsers = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await userService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await userService.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully !',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await userService.updateUser(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  });
});

export const userController = {
  createUser,
  getAllUser,
  getSingleUsers,
  deleteUser,
  updateUser,
};
