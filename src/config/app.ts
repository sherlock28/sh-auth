require('dotenv').config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import ip from 'ip';
import { routes } from '../routes';
import { HttpStatusCode } from '../const/statusCode';
import { env } from "./env";

const getApiVersion = () => {
    const version = env.VERSION ?? 1;
    return `V${version}`;
}

const configureApp = (app: any) => {

    // settings
    app.set('port', env.PORT || 4000);
    if (env.NODE_ENV === "development")
        env.APP_DOMAIN = ip.address() + ":" + env.PORT;

    // middlewares
    app.use(require("morgan")("short"));
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
