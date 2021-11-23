const { Kafka } = require('kafkajs');
const dotenv = require('dotenv');

dotenv.config();

const client = process.env.CLIENT;
const brokers = process.env.BROKERS;
const group = process.env.GROUP;

const kafka = new Kafka({
    clientId: client,
    brokers: [brokers]
});

const consumer = kafka.consumer({ groupId: group })

const connectConsumer = async () => {
	await consumer.connect()
	await consumer.subscribe({ topic: 'auth-topic', fromBeginning: true })
	await consumer.run({
		eachMessage: async ({ partition, message }) => {
			console.log({
				partition,
				offset: message.offset
			})
			console.log(message.value.toString());
		},
	})
}
module.exports = connectConsumer