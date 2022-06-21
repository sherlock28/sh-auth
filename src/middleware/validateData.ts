import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../const/statusCode';

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

export const validateData = (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.email) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'email is required.' });
        return;
    }

    if (!req.body.password) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'password is required.' });
        return;
    }

    let { email, password } = req.body;

    if (email.length == 0) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'email is required.' });
        return;
    }

    if (req.body.email.toString().match(emailRegex) === null) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'invalid email.' });
        return;
    }

    if (password.length == 0) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'password is required.' });
        return;
    }

    return next();
}