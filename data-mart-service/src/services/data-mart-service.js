const { insert } = require("../../db/connection");

const saveData = (data) => {
    const forInsert = { dist: data.dist, userName: data.name, insertDate: parseInt(Date.now())}
    console.log(forInsert);
    insert(forInsert)
}

module.exports = saveData