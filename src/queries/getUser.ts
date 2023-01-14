import fetch from "node-fetch";
import { env } from "../config/env";

async function fetchUser(queryCondition: any) {

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

    const user = await result.json();

    return user;
}


export async function getUser(queryCondition: any) {
    const response: any = await fetchUser(queryCondition);

    if (response.errors) {
        console.error(response.errors);
    }

    return response.data;
}
