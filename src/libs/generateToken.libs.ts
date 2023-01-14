import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { getPrivKey } from "./getPrivKey.libs";

export const generateToken = (user: { id: number, username: string, email: string, user_category: any }) => {
    let jwtKey = getPrivKey();

    return jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
        "user-category-id": user.user_category.id,
        "https://hasura.io/jwt/claims": {
            'x-hasura-default-role': user.user_category.description,
            'x-hasura-allowed-roles': [user.user_category.description],
        }
    }, jwtKey, { algorithm: 'RS256', expiresIn: env.EXPIRES_IN });
}
