import { z } from 'zod';

const cowZodSchema = z.object({
  body: z.object({
    name: z.string(),
    age: z.number(),
    price: z.number(),
    location: z.string(),
    breed: z.string(),
    weight: z.number(),
    label: z.string(),
    category: z.string(),
  }),
});
const cowUpdateZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.string().optional(),
    breed: z.string().optional(),
    weight: z.number().optional(),
    label: z.string().optional(),
    category: z.string().optional(),
  }),
});

export const cowValidation = {
  cowZodSchema,
  cowUpdateZodSchema,
};
