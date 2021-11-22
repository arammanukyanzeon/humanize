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

const insert = async (data) => {
    await pgClient.query({
        text: 'INSERT INTO mart(dist, user_name, insert_date) VALUES($1, $2, to_timestamp($3 / 1000.0))',
        values: [data.dist, data.userName, data.insertDate],
    });
}

module.exports = { dbConnect, insert, pgClient }