import express from 'express';

import getPaymentHandler from './get'
import createPaymentHandler from './create';

const router = express.Router();

router.post('/', createPaymentHandler);
router.get('/:address', getPaymentHandler)

export default router;
