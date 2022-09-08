import fetch from "node-fetch";
import { env } from "../config/env";

async function fetchUser(query: any) {

    const condition = `where: {${query.column}: {_eq: "${query.value}"}}`;

    const GET_USER_QUERY = `
        query GetUserQL {
            sh_users(${condition}) {
                id
                email
                password
                user_categories_id
                user_category {
                    descripcion
                }
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

    const user = await result.json();

    return user;
}


export async function getUser(query: any) {
    const response: any = await fetchUser(query);

    if (response.errors) {
        console.error(response.errors);
    }

    return response.data;
}
