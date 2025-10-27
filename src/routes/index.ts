import express from 'express';

import usersRoutes from './users';
import errorHandler from './error';
import paymentsRoutes from './payment';
import notFoundHandler from './notFound';

const router = express.Router();

router.get('/', (_, res) => {
  res.status(200).j({
    message: 'Welcome Celora api',
  });
});

router.use('/users', usersRoutes);
router.use('/payments', paymentsRoutes);

router.use(errorHandler);
router.use(notFoundHandler);

export default router;
