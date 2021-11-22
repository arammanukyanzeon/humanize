const Koa = require('koa');
const Body = require('koa-body');
const http = require('http');
const dotenv = require('dotenv');
const connectConsumer = require('./src/kafka/consumer');
const { dbConnect } = require('./db/connection');
const router = require('./src/routes/data-mart-router');

dotenv.config();
const port = process.env.PORT;

const app = new Koa();

// ---------- Connect Middlewares ---------- //
app.use(Body({
    extendTypes: {
        json: ['application/json'], // will parse application/x-javascript type body as a JSON string
    },
}));

// ---------- Set Header ------------------- //
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    ctx.set('Access-Control-Allow-Headers', 'Origin, Accept, X-Requested-With, Content-Type, Authorization');

    if (ctx.method === 'OPTIONS') {
        ctx.status = 204;
    } else {
        await next();
    }
});

// ------------ Error Handler ------------ //
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.log('Error handler', err);
        ctx.status = err.statusCode || 500;
        ctx.body = { errors: err.errors, message: err.message };
    }
});

// ---------- Connect Routers ---------- //
app.use(router.routes());

app.on('error', (err) => {
    console.error('Server error', err);
});

http.createServer(app.listen(port));

dbConnect();
connectConsumer();