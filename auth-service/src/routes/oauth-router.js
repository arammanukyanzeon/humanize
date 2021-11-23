
const Router = require('koa-router');
const oauthCtrl = require('../controllers/oauth-controller');

const oauthRouter = new Router();;

// login
oauthRouter.post(
  '/oauth/login',
  oauthCtrl.login,
);

// register
oauthRouter.post(
  '/oauth/register',
  oauthCtrl.register
);

// authenticate
oauthRouter.get(
  '/oauth/authenticate',
  oauthCtrl.authenticate,
);

oauthRouter.get(
  '/tokens',
  oauthCtrl.getAllTokens,
);

module.exports = oauthRouter;
