const Router = require('@koa/router');
const registerValidator = require('./validators/register');
const loginValidator = require('./validators/login');
const forgotPasswordValidator = require('./validators/forgotPassword')
const authController = require('./controllers');

const router = new Router({
    prefix: '/auth'
});

router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);
router.post('/password/email', forgotPasswordValidator, authController.forgotPassword);


module.exports = router;
