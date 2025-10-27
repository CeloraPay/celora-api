import express from 'express';

import addUserHandler from './add';

const router = express.Router();

router.post('/', addUserHandler);

export default router;
