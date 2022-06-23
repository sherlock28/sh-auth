import { Request, Response } from 'express';
import { HttpStatusCode } from '../const/statusCode';

class AuthController {
    public async signin(_req: Request, res: Response) {
        res.status(HttpStatusCode.OK).json({ data: 'sign in', success: true, error: false });
    }

    public async signup(_req: Request, res: Response) {
        res.status(HttpStatusCode.OK).json({ data: 'sign up', success: true, error: false });
    }
}

export const authCtrl = new AuthController();