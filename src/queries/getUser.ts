import fetch from "node-fetch";
import { env } from "../config/env";

async function fetchUser(username: string) {

    const GET_USER_QUERY = `
        query GetUserQL {
            sh_users(where: {username: {_eq: "${username}"}}) {
                id
                email
                password
                user_categories_id
                user_status
                username
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

    return await result.json();
}


export async function getUser(args: { username: string }) {
    const response: any = await fetchUser(args.username);

    if (response.errors) {
        console.error(response.errors);
    }

    return response.data;
}
