const JWT = require('jsonwebtoken');
const { pgClient } = require('../../db/connection');
const dotenv = require('dotenv');
const UserModel = require('./user-model');

dotenv.config();

class TokenModel {
  constructor(data) {
    this.accessToken = data.accessToken;
    this.userId = data.userId
  }

  static verifyToken = async function verifyToken(token, options = {}) {
    return new Promise((resolve, reject) => {
      JWT.verify(token, process.env.JWT_SECRET, options, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  };

  static generateAccessToken = async function generateAccessToken(user) {
    console.log(`Generating access token for user: ${user.id}`);
    const secret = process.env.JWT_SECRET;
    const payload = {
      user
    };

    const opt = { algorithm: 'HS256' };

    return JWT.sign(payload, secret, opt);
  };

  static saveToken = async function saveToken(token, user) {
    console.log(`Saving token for user: ${user.id}`);
    const accessToken = new TokenModel({
      accessToken: token.accessToken,
      userId: user.id,
    });

    return pgClient.query({
      text: 'INSERT INTO token(access_token, user_id) VALUES($1, $2)',
      values: [accessToken.accessToken, accessToken.userId],
    });
  };

  static getAccessToken = function getAccessToken(accessToken) {
    return new Promise(async (resolve, reject) => {
      try {
        await TokenModel.verifyToken(accessToken);
      } catch (err) {
        return reject();
      }
  
      try {
        const token = await TokenModel.findOne(accessToken);      
        const user = await UserModel.findById(token.user_id);

        resolve({
          accessToken: token.access_token,
          accessTokenExpiresAt: new Date(process.env.EXPIRATION_YEAR),
          user: user.id
        });
      } catch (err) {
        return reject();
      }
    });
  };


  static findOne = async function findOne(accessToken) {
    const res = await pgClient.query({
      text: 'SELECT * FROM token where access_token = $1',
      values: [accessToken]
    });
    const token = res.rows[0];

    if (!token) {
      throw new Error('Token not found', accessToken);
    }

    return token;
  };

  static getAllTokens = async (data) => {
    const res = await pgClient.query({
      text: 'SELECT * from token'
    });
    return res.rows;
  }
}

module.exports = TokenModel;
