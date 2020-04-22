const Router = require('@koa/router');
const v1Router = require('./v1/index');
const koaBody = require('koa-body');

const router = new Router({
    prefix: '/api'
});

router.use(koaBody());

router.use(v1Router.routes());

module.exports = router;
