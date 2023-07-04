import { Model } from 'mongoose';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { Types } from 'mongoose';

export type ILoginAdmin = {
    phoneNumber: string;
    password: string;
};

export type ILoginAdminResponse = {
    accessToken: string;
    refreshToken?: string;

};


export type IAdmin = {
    phoneNumber: string;
    role: ENUM_USER_ROLE.Admin;
    password: string;
    name: UserName;
    address: string;
}

export type IAdminReturn = {
    _id: Types.ObjectId;
    phoneNumber: string;
    role: ENUM_USER_ROLE.Admin;
    name: UserName;
    address: string;
}

export type UserName = {
    firstName: string;
    lastName: string;
};


export type adminModel = Model<IAdmin, Record<string, unknown>>;