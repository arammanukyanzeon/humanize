const { scheduleJob } = require('node-schedule');
const dotenv = require("dotenv");
const getData = require('./src/services/data_collector');
const { connectProducer } = require('./src/kafka/producer')

dotenv.config();
const port = process.env.PORT;

class Server {
    constructor() {
        connectProducer();
        this.initJobs();
    }

    initJobs() {
        scheduleJob('* */1 * * *', () => {
            getData();
        });
    }
}

new Server();