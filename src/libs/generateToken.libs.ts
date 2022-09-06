import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { getPrivKey } from "./getPrivKey.libs";

export const generateToken = (user: { id: number, username: string, email: string }) => {

    let jwtKey = getPrivKey();

    return jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
        "https://hasura.io/jwt/claims": {
            'x-hasura-default-role': 'student',
            'x-hasura-allowed-roles': ['student'],
        }
    }, jwtKey, { algorithm: 'RS256', expiresIn: env.EXPIRES_IN });
}
