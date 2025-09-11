import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import captainRouter from './routes/captain.route.js';
import mapsRouter from './routes/maps.route.js';
import rideRouter from './routes/ride.route.js';
const app = express();
app.use(cookieParser());
import dbConnection from './db/db.js';

app.use(
  cors({
    origin: '*', // Allow your all's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(express.json());
dbConnection();

app.use('/user', userRouter);
app.use('/captain', captainRouter);
app.use('/maps', mapsRouter);
app.use('/ride', rideRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
