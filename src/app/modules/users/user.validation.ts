import { z } from 'zod';
import { role } from './user.const';

const userZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    phoneNumber: z.string(),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    role: z.enum([...role] as [string, ...string[]], {
      required_error: 'Role  is required buyer or seller ',
    }),
    address: z.string(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});
const userUpdateZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    phoneNumber: z.string().optional(),
    name: z
      .object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      })
      .optional(),
    role: z
      .enum([...role] as [string, ...string[]], {
        required_error: 'Role  is required buyer or seller ',
      })
      .optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

export const userValidation = {
  userZodSchema,
  userUpdateZodSchema,
};
