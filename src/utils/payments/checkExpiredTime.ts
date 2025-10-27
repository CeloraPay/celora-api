import { ONE_MINUTES } from '../../constants/dates';
import paymentsToExpired from './paymentsToExpired';

const checkExpiredTime = () => {
  setInterval(() => {
    paymentsToExpired();
  }, ONE_MINUTES);
};

export default checkExpiredTime;
