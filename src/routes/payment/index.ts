import express from 'express';

import createPaymentHandler from './create';

const router = express.Router();

router.post('/', createPaymentHandler);

export default router;
