import Payment from '../../models/Payment';
import paymentToExpired from './paymentToExpired';

const paymentsToExpired = async () => {
  const currentTime = Date.now();

  const orders = await Payment.find({ expiredTimestamp: { $lt: currentTime }, status: 'pending' });

  for (const order of orders) {
    paymentToExpired(order._id);
  }
};

export default paymentsToExpired;
