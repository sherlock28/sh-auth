import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { getPrivKey } from "./getPrivKey.libs";
import { USER_CATEGORY } from "../const/others";

export const generateToken = (user: { id: number, username: string, email: string, user_category: any }) => {
	let jwtKey = getPrivKey();

	const categoryId = user.user_category?.id ?? USER_CATEGORY.UNDEFINED_USER_CATEGORY;
	const categoryDescription = user.user_category?.description ?? USER_CATEGORY.DEFAULT_USER_CATEGORY;

	return jwt.sign({
		id: user.id,
		username: user.username,
		email: user.email,
		"user-category-id": categoryId,
		"https://hasura.io/jwt/claims": {
			'x-hasura-default-role': categoryDescription,
			'x-hasura-allowed-roles': [categoryDescription],
		}
	}, jwtKey, { algorithm: 'RS256', expiresIn: env.EXPIRES_IN });
}
