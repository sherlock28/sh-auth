import defaultConfig, { db_config } from './dbconfig';
import { Pool, Client } from 'pg';

const currentConfig = {
    host: db_config.host || defaultConfig.pghost,
    user: db_config.user || defaultConfig.pguser,
    password: db_config.password || defaultConfig.pgpassword,
    database: db_config.database || defaultConfig.pgdatabase,
    port: +db_config.port || +defaultConfig.pgport
};

async function connect(): Promise<Pool> {
    return await new Pool(currentConfig);
}

function disconnect(pool: any) {
    return pool.end();
}

export {
    connect,
    disconnect
}