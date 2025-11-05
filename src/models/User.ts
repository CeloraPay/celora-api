import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  plan: number;
  apikey: string;
  address: string;
  description: string;
  telegramId?: string;
}

const User = new Schema<IUser>(
  {
    plan: { type: Number, required: true },
    telegramId: { type: String, required: false },
    description: { type: String, required: true },
    apikey: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export default model<IUser>('User', User);
