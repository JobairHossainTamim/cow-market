"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.authValidation = {
    loginZodSchema,
    refreshTokenZodSchema
};
