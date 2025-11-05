import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import db from './config/db';
import routes from './routes';
import envs from './config/envs';
import log from './config/logger';
import saveCurrencies from './utils/saveCurrencies';
import saveDefaultToken from './utils/saveDefaultToken';
import checkExpiredTime from './utils/payments/checkExpiredTime';
import customResponseHandler from './middlewares/customResponseHandler';
import checkFinalize from './utils/contracts/gateway/checkFinalize';

const app = express();

const { DB_URI, DB_NAME, PORT } = envs();

db(DB_URI, DB_NAME);

app.use(compression());
app.use(helmet());
app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

saveCurrencies();
saveDefaultToken()
checkExpiredTime();
checkFinalize()

app.use(customResponseHandler);
app.use(routes);

app.listen(PORT, () => {
    log.info(`APP: Started on ${PORT}`);
});
