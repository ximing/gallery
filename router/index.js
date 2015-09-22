/**
 * Created by yeanzhi on 15/9/22.
 */
var Router = require('koa-router');
var router = new Router();
require('./update').register(router);
exports.register = function (app) {
    app.use(router.middleware());
};
