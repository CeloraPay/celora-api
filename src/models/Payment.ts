import { Schema, model } from 'mongoose';

import { FIFTEEN_MINUTES } from '../constants/dates';
import paymentToExpired from '../utils/payments/paymentToExpired';


export interface IPayment {
  amount: string;
  currency: string;
  finalized: boolean;
  isTransfer: boolean;
  redirectUrl: string;
  expiredTime: number;
  descriptions: string;
  initialAmount: string;
  isTransferFiat: boolean;
  depositedAmount: number;
  user: Schema.Types.ObjectId;
  token: Schema.Types.ObjectId;
  status: 'pending' | 'completed' | 'expired' | 'cancelled';
  invoiceId?: string;
  paymentAddr?: string;
}

const Payment = new Schema<IPayment>(
  {
    amount: { type: String, required: true },
    invoiceId: { type: String, required: true },
    expiredTime: { type: Number, required: true },
    redirectUrl: { type: String, required: true },
    descriptions: { type: String, required: true },
    paymentAddr: { type: String, required: true },
    initialAmount: { type: String, required: true },
    depositedAmount: { type: Number, required: true },
    finalized: { type: Boolean, required: true, default: false },
    isTransfer: { type: Boolean, required: true, default: false },
    isTransferFiat: { type: Boolean, required: true, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: Schema.Types.ObjectId, ref: 'Token', required: true },
    currency: { type: String, default: 'USD' },
    status: {
      type: String,
      enum: ['pending', 'completed', 'expired', 'cancelled'],
      required: true,
    },
  },
  { timestamps: true },
);

Payment.post('save', async function (order) {
  setTimeout(() => {
    paymentToExpired(order._id);
  }, FIFTEEN_MINUTES);
});

export default model<IPayment>('Payment', Payment);
