import express from 'express';

import getPaymentHandler from './get'
import createPaymentHandler from './create';
import getPaymentsHandler from './getPayments'

const router = express.Router();

router.get('/', getPaymentsHandler)
router.post('/', createPaymentHandler);
router.get('/:address', getPaymentHandler)

export default router;
