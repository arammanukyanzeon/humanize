const { Client: PgClient } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pgClient = new PgClient({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

const dbConnect = async () => {
    await pgClient.connect();
}

module.exports = { dbConnect, pgClient }