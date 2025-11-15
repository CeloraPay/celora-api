import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  plan: number;
  apikey: string;
  address: string;
  name: string;
  telegramId?: string;
  tokensAmount?: ITokensAmount[];
}

interface ITokensAmount {
  address: string;
  amount: number;
}

const User = new Schema<IUser>(
  {
    plan: { type: Number, required: true },
    name: { type: String, required: true },
    telegramId: { type: String, required: false },
    tokensAmount: [{ type: String, require: false }],
    apikey: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export default model<IUser>('User', User);
