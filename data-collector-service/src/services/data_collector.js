const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { send } = require('../kafka/producer');

function getData() {
    const randomId = Date.now() % 10 + 1;
    const url = `https://jsonplaceholder.typicode.com/users/${randomId}`;
    fetch(url)
        .then(response => response.json())
        .then(json => send(json))
}

module.exports = getData