import { Model } from 'mongoose';

export type IUser = {
  name: UserName;
  password: string;
  role: 'buyer' | 'seller';
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type UserName = {
  firstName: string;
  lastName: string;
};

export type userModel = Model<IUser, Record<string, unknown>>;

export type IUserFilters = {
  searchTerm?: string;
  address?: string;
  contactNo?: string;
  name?: string;
  phoneNumber?: string;
};
