"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidation = void 0;
const zod_1 = require("zod");
const user_1 = require("../../../enums/user");
const adminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string(),
        role: zod_1.z.enum([user_1.ENUM_USER_ROLE.Admin], {
            required_error: 'Admin role is required',
        }),
        password: zod_1.z.string(),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }),
        address: zod_1.z.string(),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
});
exports.adminValidation = {
    adminZodSchema,
    loginZodSchema
};
