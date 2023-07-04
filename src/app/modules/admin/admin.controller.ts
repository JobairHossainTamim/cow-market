import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAdminReturn, ILoginAdminResponse } from './admin.interface';
import httpStatus from 'http-status';
import { Admin } from './admin.model';
import ApiError from '../../../errors/ApiError';
import jwt from 'jsonwebtoken';

export const JWT_SECRET = 'your-secret-key';

const createAdmin = catchAsync(async (req: Request, res: Response) => {

    const { password, role, name, phoneNumber, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
        password: hashedPassword,
        role,
        name,
        phoneNumber,
        address,
    });

    const { _id, role: adminRole, name: adminName, phoneNumber: adminPhoneNumber, address: adminAddress } = admin;



    sendResponse<IAdminReturn>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin created successfully!',
        data: {
            _id,
            role: adminRole,
            name: adminName,
            phoneNumber: adminPhoneNumber,
            address: adminAddress,
        },
    });
})

const loginAdmin = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const { phoneNumber, password } = req.body;

    const admin = await Admin.findOne({ phoneNumber });

    if (!admin) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Phone number does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);



    if (!isPasswordValid) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Password does not exist');
    }

    const token = jwt.sign({ _id: admin._id, role: admin.role }, JWT_SECRET, { expiresIn: '15d' });

    sendResponse<ILoginAdminResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin created successfully!',
        data: {
            accessToken: token,
        },
    });
})






export const adminController = {

    createAdmin,
    loginAdmin
}