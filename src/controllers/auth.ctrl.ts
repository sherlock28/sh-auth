import { Request, Response } from 'express';
import { httpStatusCode } from '../const/statusCode';

class UserController {
    public async signin(_req: Request, res: Response) {
        res.status(httpStatusCode.OK).json({ data: 'Hello world', success: true, error: false });
    }
}

export const userController = new UserController();