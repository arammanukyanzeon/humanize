const { Request, oauth2, authServer } = require('../../libs/oauth2');

const UserModel = require('../models/user-model');
const TokenModel = require('../models/token-model');

const controller = {};

controller.login = async (ctx) => {
  const {
    login,
    password,
  } = ctx.request.body;

  try {
    const user = await UserModel.getUser(login, password);
    const token = await TokenModel.findOne(user.id);
    const accessToken = token.access_token

    ctx.body = { accessToken };

    ctx.status = 200;
  } catch (err) {
    console.log(`Error on login: ${err}`);
  }
};

controller.register = async (ctx) => {

  const data = ctx.request.body;
  console.log(`Registering user ${data.login}`);

  const user = await UserModel.createUser(data);
  const accessToken = await TokenModel.generateAccessToken(user);

  await TokenModel.saveToken({
    accessToken,
  }, user);

  console.log(`User registered ${user.login}`);

  ctx.status = 200;
  ctx.body = {
    user
  };
};

controller.authenticate = async (ctx) => {
  const request = new Request({
    headers: {
      ...ctx.request.headers,
      'content-type': 'application/x-www-form-urlencoded',
    },
    query: ctx.request.query,
    body: ctx.request.body,
    method: ctx.request.method,
  });

  try {
    const token = await authServer.authenticate(request, oauth2.initResponse(ctx));
    await TokenModel.verifyToken(token.accessToken);
    ctx.body = token.user_id;
    ctx.status = 200;
  } catch (err) {
    ctx.status = 402;
    ctx.body = {};
  }
};

controller.getAllTokens = async (ctx) => {
  try {
    const users = await TokenModel.getAllTokens();
    ctx.body = users;
    ctx.status = 200;
  } catch (err) {
    console.log(`Error on authenticate: ${err.message}`);
  }
};

module.exports = controller;
