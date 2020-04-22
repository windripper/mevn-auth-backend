const Koa = require('koa');
const app = new Koa();
const config = require('./config');
const api = require('./api');
const db = require('./database');

const logger = require('koa-logger');
const cors = require('@koa/cors');
const helmet = require('helmet');

// middleware
app.use(logger());
app.use(cors());
// app.use(helmet);

// router
app.use(api.routes());
app.use(api.allowedMethods())

console.log(config.port);
app.listen(config.port);
