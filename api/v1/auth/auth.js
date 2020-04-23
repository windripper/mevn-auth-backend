const Router = require('@koa/router');
const registerValidator = require('./validators/register');
const loginValidator = require('./validators/login');
const forgotPasswordValidator = require('./validators/forgotPassword');
const resetPasswordValidator = require('./validators/resetPassword');
const emailConfirmValidator = require('./validators/emailConfirm');
const authMiddleware = require('./middleware/auth');
const authController = require('./controllers');

const router = new Router({
    prefix: '/auth'
});

router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);
router.post('/password/email', forgotPasswordValidator, authController.forgotPassword);
router.post('/password/reset', resetPasswordValidator, authController.resetPassword);
router.post('/email/confirm', emailConfirmValidator, authController.confirmEmail);
router.post('/emails/resend', authMiddleware, authController.resendConfirmEmail);


module.exports = router;
