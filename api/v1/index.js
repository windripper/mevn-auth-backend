const Router = require('@koa/router');
const auth = require('./auth/auth');

const v1Router = new Router({
    prefix: '/v1'
});

v1Router.use(auth.routes());

module.exports = v1Router;
