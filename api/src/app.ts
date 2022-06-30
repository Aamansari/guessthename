import express, { Express } from 'express';
import morgan from 'morgan';
import { HttpStatus } from './utils/httpUtils';
import guessRoutes from './routes/guessRoutes';
import nameTargetRoutes from './routes/nameTargetRoutes';

import cors from 'cors';
import rateLimit from 'express-rate-limit'

const app: Express = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.options('*', cors);

// Cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'origin, X-Requested-With,Content-Type,Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET POST');
    return res.status(HttpStatus.OK).json({});
  }
  next();
});

// Add rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter)

// Api routes
app.use('/', guessRoutes);
app.use('/', nameTargetRoutes);

// Not found route
app.use((req, res) => {
  return res.status(HttpStatus.NOT_FOUND).json({
    message: 'Not found'
  });
});

export default app;
