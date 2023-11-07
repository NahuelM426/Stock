import express, { Application } from 'express';
import morgan from 'morgan';

import AuthController from './routes/auth'
import AlmacenRouter from './routes/almacen';
import ProductoRouter from './routes/producto'

const app: Application = express();

// settings
app.set('port', 4001 || process.env.PORT);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', AuthController);
app.use('/api/almacen',AlmacenRouter);
app.use('/api/producto',ProductoRouter);

export default app;
