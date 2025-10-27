import { Types } from 'mongoose';
import Payment from '../../models/Payment';

const paymentToExpired = async (orderId: Types.ObjectId) => {
  const order = await Payment.findById(orderId);

  if (!order) {
    return;
  }

  if (order.status === 'pending') {
    order.status = 'expired';

    await order.save();
  }
};

export default paymentToExpired;
