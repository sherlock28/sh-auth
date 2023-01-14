import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../const/statusCode';

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

export const validateRegisterData = (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.email) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'email is required.' });
    }

    if (!req.body.password) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'password is required.' });
    }

    let { email, password } = req.body;

    if (email.length == 0) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'email is required.' });
    }

    if (req.body.email.toString().match(emailRegex) === null) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'invalid email.' });
    }

    if (password.length == 0) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'password is required.' });
    }

    return next();
}
