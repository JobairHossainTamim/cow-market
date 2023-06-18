import { Schema, model } from 'mongoose';
import { ICow, cowModel } from './cow.interface';

export const userSchema = new Schema<ICow, cowModel>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    default: 'for sale',
  },
  category: {
    type: String,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Cow = model<ICow, cowModel>('Cow', userSchema);
