import type { Express } from 'express';

import express from 'express';
import morgan from 'morgan';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';

import { config } from './config.js';

import errorHandler from './middleware/error-handler';

import authRouter from './auth/auth-router';
import usersRouter from './users/users-router';
import waypointsRouter from './waypoints/waypointsRouter';
import tripsRouter from './trips/trips-router';

const app: Express = express();

const corsOpts: CorsOptions = {
  origin: () => config.NODE_ENV === 'development' ? '*' : 'https://trouvaille.vercel.app/',
  maxAge: 1000
}

app.use(express.json());

app.use(
	morgan(config.NODE_ENV === 'production' ? 'tiny' : 'common', {
		skip: () => config.NODE_ENV === 'test',
	})
);
app.use(helmet());
app.use(cors(corsOpts));

app.use('/api/waypoints', waypointsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);

app.use(errorHandler);

export default app;
