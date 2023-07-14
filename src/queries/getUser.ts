import fetch from "node-fetch";
import { env } from "../config/env";
import logger from '../config/logger';

async function fetchUser(queryCondition: any) {

	try {

		const condition = `where: {${queryCondition.column}: {_eq: "${queryCondition.value}"}, _and: {user_status: {_eq: true}}}`;

		const GET_USER_QUERY = `
        query GetUserQL {
            sh_users(${condition}) {
                id
                username
                email
                password
                user_status
                user_category {
                    id
                    description
                }
            }
        }
    `;

		const result = await fetch(
			env.GRAPHQL_ENDPOINT,
			{
				method: "POST",
				body: JSON.stringify({ query: GET_USER_QUERY }),
				headers: { "x-hasura-admin-secret": env.X_HASURA_ADMIN_SECRET }
			}
		);

		if (result === undefined || result === null) {
			return { user: null, message: "Couldn't connect to hasura" };
		}

		const user = await result.json();

		return { user, message: "" };

	} catch (err) {
		logger.error("Couldn't connect to hasura")
		return { user: null, message: "Couldn't connect to hasura" };
	}
}


export async function getUser(queryCondition: any) {
	const response: any = await fetchUser(queryCondition);
	const data = response.user?.data ?? null;
	return { data, message: response.message};
}
