import { RequestHandler } from 'express';

const networkHandler: RequestHandler = (req, _, next) => {
  if (req.params.network === 'testnet' || req.params.network === 'mainnet') {
    req.network = req.params.network;
  } else {
    req.network = 'testnet';
  }

  next();
};

export default networkHandler;
