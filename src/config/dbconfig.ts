const defaultConfig = {
    pghost: "localhost",
    pgport: 5432,
    pgdatabase: "testsh",
    pguser: "postgres",
    pgpassword: "postgres"
}

const db_development = {
    host: process.env.DEV_PGHOST || defaultConfig.pghost,
    port: process.env.DEV_PGPORT ? +process.env.DEV_PGPORT :  defaultConfig.pgport,
    database: process.env.DEV_PGDATABASE || defaultConfig.pgdatabase,
    user: process.env.DEV_PGUSER || "postgres",
    password: process.env.DEV_PGPASSWORD || "postgres",
};

const db_production = {
    host: process.env.PGHOST || defaultConfig.pghost,
    port: process.env.PGPORT ? +process.env.PGPORT :  defaultConfig.pgport,
    database: process.env.PGDATABASE || defaultConfig.pgdatabase,
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "postgres",
};

export const db_config =
    process.env.NODE_ENV === "production" ? db_production : db_development;
