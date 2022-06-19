import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import authRoutes from '../routes/auth.route';

config();

const getApiVersion = () => {
    const version = process.env.VERSION ?? 1;
    return `V${version}`;
}

const configureApp = (app: any) => {

    // settings
    app.set('port', process.env.PORT || 4000);

    // middlewares
    if (process.env.NODE_ENV === "development") {
        app.use(morgan('dev'));
    }
    app.use(cors());
    app.use(express.json());

    // routes
    app.get('/', (_req: Request, res: Response) => {
        res.send('Auth Service - Segundo Hogar');
    });
    app.use(`/api/${getApiVersion()}/auth`, authRoutes);

    return app;
}

export default configureApp;
