import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { cowService } from './cow.services';
import sendResponse from '../../../shared/sendResponse';
import { ICow } from './cow.interface';
import httpStatus from 'http-status';
import { cowFilterableFields } from './cow.const';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body;

  const result = await cowService.createCow(cowData);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully!',
    data: result,
  });
});

const getAllCow = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await cowService.getAllCows(filters, paginationOptions);
  sendResponse<ICow | undefined | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve Cow successfully!',
    meta: result.meta,
    data: result.data.length > 0 ? result.data[0] : null,
  });
});

const getSingleCows = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await cowService.getSingleCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved successfully !',
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await cowService.deleteCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully !',
    data: result,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await cowService.updateCow(id, updatedData);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow updated successfully !',
    data: result,
  });
});

export const cowController = {
  createCow,
  getAllCow,
  getSingleCows,
  updateCow,
  deleteCow,
};
