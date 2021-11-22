const Router = require('koa-router');
const martController = require('../controllers/data-mart-controller');

const router = new Router();

router.get(
    '/data',
    martController.getAll
);

module.exports = router