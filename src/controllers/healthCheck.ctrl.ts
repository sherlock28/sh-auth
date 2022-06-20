import { Request, Response } from 'express';
import { HttpStatusCode } from '../const/statusCode';

interface Health {
    uptime: number;
    message: string;
    timestamp: number;
}

class HealthCheckCtrl {
    public healthCheck(_req: Request, res: Response) {

        const health: Health = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now()
        };

        try {
            res.status(HttpStatusCode.OK).json(health);
        } catch (error) {
            health.message = "Service is not available";
            res.status(HttpStatusCode.SERVICE_UNAVAILABLE).json(health);
        }
    }
}

export const healthCheckCtrl = new HealthCheckCtrl();
