const bcrypt = require('bcrypt');
const { pgClient } = require('../../db/connection');

class UserModel {
  constructor(data) {
    this.login = data.login;
    this.password = data.password
  }

  static getUser = async function getUser(login, password) {
    console.log(`Getting user login: ${login}`);
    const res = await pgClient.query({
      text: 'SELECT * FROM users where login = $1',
      values: [login]
    });
    const user = res.rows[0];

    if (!user) {
      throw new Error('User not found', 'user');
    }
    

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new Error('Invalid password', 'password');
    }

    return user;
  };

  static findById = async function findById(id) {
    const res = await pgClient.query({
      text: 'SELECT * FROM users where id = $1',
      values: [id]
    });
    const user = res.rows[0];

    if (!user) {
      throw new Error('User not found', 'user');
    }

    return user;
  };

  static createUser = async function createUser(userData) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userData.password, salt);
    userData.password = hash;

    const user = new UserModel(userData);
    const res = await pgClient.query({
      text: 'INSERT INTO users(login, password) VALUES($1, $2) RETURNING *',
      values: [user.login, user.password],
    });
    const createdUser = res.rows[0];
    return createdUser;
  };
}

module.exports = UserModel;
