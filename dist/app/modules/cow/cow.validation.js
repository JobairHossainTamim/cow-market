"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowValidation = void 0;
const zod_1 = require("zod");
const cowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        age: zod_1.z.number(),
        price: zod_1.z.number(),
        location: zod_1.z.string(),
        breed: zod_1.z.string(),
        weight: zod_1.z.number(),
        label: zod_1.z.string(),
        category: zod_1.z.string(),
    }),
});
const cowUpdateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.string().optional(),
        breed: zod_1.z.string().optional(),
        weight: zod_1.z.number().optional(),
        label: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
    }),
});
exports.cowValidation = {
    cowZodSchema,
    cowUpdateZodSchema,
};
