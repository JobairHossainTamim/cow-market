import { Schema, model } from "mongoose";
import { IAdmin, adminModel } from "./admin.interface";



export const adminSchema = new Schema<IAdmin, adminModel>(
    {
        phoneNumber: { type: String, required: true, require: true },
        role: { type: String, enum: ["admin"] },
        password: { type: String, required: true },
        name: {
            type: {
                firstName: {
                    type: String,
                    required: true,
                },
                lastName: {
                    type: String,
                    required: true,
                },
            },
            required: true,
        },
        address: { type: String, required: true },
    },


    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }


);

export const Admin = model<IAdmin, adminModel>('Admin', adminSchema);