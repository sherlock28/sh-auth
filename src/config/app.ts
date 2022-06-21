import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { routes } from '../routes';
import { HttpStatusCode } from '../const/statusCode';
require("./database");

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
        app.use(require("morgan")("dev"));
    }
    app.use(cors());
    app.use(express.json());

    // routes
    app.get('/', (_req: Request, res: Response) => {
        res.status(HttpStatusCode.OK).json({
            message: `Auth Service - Segundo Hogar`,
            version: getApiVersion()
        });
    });
    app.use(`/api/${getApiVersion()}/auth`, routes.authRoutes);
    app.use(`/api/${getApiVersion()}`, routes.healthRoutes);

    return app;
}

export default configureApp;
