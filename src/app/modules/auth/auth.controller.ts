import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { User } from "../users/user.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import bcrypt from 'bcrypt'
import sendResponse from "../../../shared/sendResponse";
import jwt from 'jsonwebtoken';
import { ILoginAdminResponse } from "../admin/admin.interface";


export const JWT_SECRET = 'your-secret-key';

const REFRESH_TOKEN_SECRET = 'your-refresh-token-secret';
const ACCESS_TOKEN_EXPIRY = '1h';



const loginAdmin = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const { phoneNumber, password } = req.body;

    const admin = await User.findOne({ phoneNumber });

    if (!admin) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Phone number does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
    }

    const token = jwt.sign({ _id: admin._id, role: admin.role }, JWT_SECRET, { expiresIn: '15d' });

    sendResponse<ILoginAdminResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: {
            accessToken: token,
        },
    });
});

const refreshToken = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Missing refresh token');
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid refresh token' });
        }

        const accessToken = generateAccessToken(decoded._id, decoded.role);

        sendResponse<ILoginAdminResponse>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'New access token generated successfully!',
            data: {
                accessToken
            },
        });
    })

})


const generateAccessToken = (userId: string, role: string): string => {
    return jwt.sign({ _id: userId, role }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
};



export const authController = {

    loginAdmin,
    refreshToken
}