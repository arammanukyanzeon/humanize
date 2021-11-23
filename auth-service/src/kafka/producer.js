const { Kafka } = require('kafkajs');
const dotenv = require('dotenv');

dotenv.config();
const client = process.env.CLIENT;
const brokers = process.env.BROKERS;

const kafka = new Kafka({
    clientId: client,
    brokers: [brokers]
});

const producer = kafka.producer()
const connectProducer = async () => {
    await producer.connect()
};

const send = async (value) => {
    await producer.send({
        topic: 'auth-topic',
        messages: [
            { value: Buffer.from(JSON.stringify(value)) },
        ],
    })
}

module.exports = { send, connectProducer }