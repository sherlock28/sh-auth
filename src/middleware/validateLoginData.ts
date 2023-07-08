import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../const/statusCode';
import { serviceResponse } from '../libs/serviceResponse.libs';

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

export const validateLoginData = (req: Request, res: Response, next: NextFunction) => {

    if (req.body.email === undefined && req.body.username === undefined) {
        return res.status(HttpStatusCode.BAD_REQUEST).json(serviceResponse({ data: null, success: false, message: 'email or username are missing.', error: 'email or username are required.' }));
    }

    if (req.body.email?.length === 0 && req.body.username?.length === 0) {
        return res.status(HttpStatusCode.BAD_REQUEST).json(serviceResponse({ data: null, success: false, message: 'email or username are missing.', error: 'email or username are required.' }));
    }

    if (req.body.email?.toString().match(emailRegex) === null) {
        return res.status(HttpStatusCode.BAD_REQUEST).json(serviceResponse({ data: null, success: false, message: 'invalid email.', error: 'invalid format email.' }));
    }

    if (req.body.password === undefined || req.body.password.length == 0) {
        return res.status(HttpStatusCode.BAD_REQUEST).json(serviceResponse({ data: null, success: false, message: 'password are missing.', error: 'password are required.' }));
    }

    return next();
}

export const validateSocialLoginData = (req: Request, res: Response, next: NextFunction) => {

    if (req.body.email === undefined) {
        return res.status(HttpStatusCode.BAD_REQUEST).json(serviceResponse({ data: null, success: false, message: 'email are missing.', error: 'email are required.' }));
    }

    if (req.body.email?.length === 0) {
        return res.status(HttpStatusCode.BAD_REQUEST).json(serviceResponse({ data: null, success: false, message: 'email are missing.', error: 'email are required.' }));
    }

    if (req.body.email?.toString().match(emailRegex) === null) {
        return res.status(HttpStatusCode.BAD_REQUEST).json(serviceResponse({ data: null, success: false, message: 'invalid email.', error: 'invalid format email.' }));
    }

    return next();
}
