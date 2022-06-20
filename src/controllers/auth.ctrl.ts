import { Request, Response } from 'express';
import { HttpStatusCode } from '../const/statusCode';

class AuthController {
    public async signin(_req: Request, res: Response) {
        res.status(HttpStatusCode.OK).json({ data: 'Hello world', success: true, error: false });
    }
}

export const authCtrl = new AuthController();