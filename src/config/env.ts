export const env = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    VERSION: process.env.VERSION ? +process.env.VERSION : 1,
    APP_DOMAIN: process.env.APP_DOMAIN,
    GRAPHQL_ENDPOINT: "" + process.env.GRAPHQL_ENDPOINT,
    X_HASURA_ADMIN_SECRET: "" + process.env.X_HASURA_ADMIN_SECRET,
    EXPIRES_IN: process.env.EXPIRES_IN ? +process.env.EXPIRES_IN : 3600
}
