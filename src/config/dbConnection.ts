import { db_config } from './dbconfig';
import { Pool } from 'pg';

async function connect(): Promise<Pool> {
    return await new Pool(db_config);
}

function disconnect(pool: any) {
    return pool.end();
}

export {
    connect,
    disconnect
}