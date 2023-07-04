import { z } from 'zod';
import { ENUM_USER_ROLE } from '../../../enums/user';


const adminZodSchema = z.object({
    body: z.object({
        phoneNumber: z.string(),
        role: z.enum([ENUM_USER_ROLE.Admin], {
            required_error: 'Admin role is required',
        }),

        password: z.string(),

        name: z.object({
            firstName: z.string({
                required_error: 'First name is required',
            }),
            lastName: z.string({
                required_error: 'Last name is required',
            }),
        }),

        address: z.string(),

    }),
});
const loginZodSchema = z.object({
    body: z.object({
        phoneNumber: z.string(),


        password: z.string(),

    }),
});


export const adminValidation = {
    adminZodSchema,
    loginZodSchema
};