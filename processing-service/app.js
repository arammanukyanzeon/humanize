const connectConsumer = require('./src/kafka/consumer');
const { connectProducer } = require('./src/kafka/producer');

class Server {
    constructor() {
        connectConsumer();
        connectProducer()
    }
}

let server = new Server();