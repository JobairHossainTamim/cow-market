import { Model, Types } from 'mongoose';
import { IUser } from '../users/user.interface';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: ICity;
  breed: IBreed;
  weight: number;
  label: 'for sale' | 'sold out';
  category: ICowCategory;
  seller: Types.ObjectId | IUser;
};

export type cowModel = Model<ICow, Record<string, unknown>>;

export type ICity =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';

export type IBreed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';

export type ICowCategory = 'Dairy' | 'Beef ' | 'Dual Purpose';

export type ICowFilters = {
  searchTerm?: string;
  name?: string;
  price?: string;
  location?: string;
  breed?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};
