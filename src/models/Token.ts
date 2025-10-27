import { Schema, model, Document } from 'mongoose';

export interface IToken extends Document {
    logo: string;
    symbol: string;
    address: string;
}

const Token = new Schema<IToken>({
    symbol: { type: String, required: true },
    logo: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
});

export default model<IToken>('Token', Token);
