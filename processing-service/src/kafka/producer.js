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

const send = async (data) => {
    await producer.send({
        topic: 'data-mart-topic',
        messages: [
            { value: Buffer.from(JSON.stringify(data)) },
        ],
    })
}

module.exports = { send, connectProducer }