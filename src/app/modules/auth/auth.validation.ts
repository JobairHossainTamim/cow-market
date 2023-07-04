
import { z } from 'zod';
const loginZodSchema = z.object({
    body: z.object({
        phoneNumber: z.string(),


        password: z.string(),

    }),
});

const refreshTokenZodSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});


export const authValidation = {

    loginZodSchema,
    refreshTokenZodSchema
};