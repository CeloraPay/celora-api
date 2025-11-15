import express from 'express';

import addUserHandler from './add';
import getUserHandler from './get'
import checkUserHandler from './check'
import getUserAnalyzeHandler from './getAnalyze';


const router = express.Router();

router.post('/', addUserHandler);
router.get('/:address', getUserHandler)
router.get('/analyze/token', getUserAnalyzeHandler)
router.get('/check/:address', checkUserHandler)

export default router;
