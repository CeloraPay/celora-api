import express from 'express';

import errorHandler from './error';
import notFoundHandler from './notFound';

const router = express.Router();

router.get('/', (_, res) => {
  res.status(200).j({
    message: 'Welcome Celora api',
  });
});

router.use(notFoundHandler);
router.use(errorHandler);

export default router;
