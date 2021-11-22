
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { pgClient } = require('../../db/connection')
const controller = {};

controller.getAll = async (ctx) => {
    const response = await fetch(`http://auth-service:3001/oauth/authenticate/`, { headers: ctx.headers });
    console.log(response.status);
    if (response.status !== 200) {
        ctx.body = {};
        ctx.status = 402
        return;
    }

    try {
        const res = await pgClient.query({
            text: 'SELECT * from mart'
        });
        const data = res.rows;

        ctx.body = data;
        ctx.status = 200;
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

module.exports = controller