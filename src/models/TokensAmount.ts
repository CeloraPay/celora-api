import { Schema, model, Document } from 'mongoose';
import { ref } from 'process';

export interface ITokensAmount extends Document {
    amount: number;
    address: string;
    user: Schema.Types.ObjectId;
}

const TokensAmount = new Schema<ITokensAmount>({
    amount: { type: Number, required: true },
    address: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" }
});

export default model<ITokensAmount>('TokensAmount', TokensAmount);
