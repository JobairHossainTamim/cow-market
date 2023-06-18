"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const user_const_1 = require("./user.const");
const userZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string(),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }),
        role: zod_1.z.enum([...user_const_1.role], {
            required_error: 'Role  is required buyer or seller ',
        }),
        address: zod_1.z.string(),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
const userUpdateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string().optional(),
        name: zod_1.z
            .object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        })
            .optional(),
        role: zod_1.z
            .enum([...user_const_1.role], {
            required_error: 'Role  is required buyer or seller ',
        })
            .optional(),
        address: zod_1.z.string().optional(),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
exports.userValidation = {
    userZodSchema,
    userUpdateZodSchema,
};
