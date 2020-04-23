const User = require('../../../database/models/User');
const PasswordReset = require('../../../database/models/PasswordReset');
const Bcrypt = require('bcryptjs');

const register = async ctx => {
    const { name, email, password } = ctx.request.body;
    const user = await User.create({
        name,
        email,
        password
    });

    const token = user.generateToken();


    ctx.status = 201;
    ctx.body = ({ user, token });
};

const login = async ctx => {
    const { email, password } = ctx.request.body;

    const user = await User.findOne({ email });

    if (user) {
        if (user.comparePasswords(password)) {
            const token = user.generateToken();

            return ctx.body = { user, token };
        }
    }

    ctx.status = 400;
    ctx.body = {
        email: 'These credentials do not match our records'
    };
};

const forgotPassword = async ctx => {
    await ctx.user.forgotPassword();

    return ctx.body = ({
        message: 'Password reset link has been sent.'
    });
};

const resetPassword = async ctx => {
    const { user } = ctx;

    await User.findOneAndUpdate({
        email: user.email,

    }, {
        password: Bcrypt.hashSync(ctx.request.body.password)
    });

    await PasswordReset.findOneAndDelete({
        email: user.email
    });

    ctx.body = {
        message: 'Password reset successful'
    };
};

const confirmEmail = async ctx => {
    const user = await User.findOneAndUpdate({
        email: ctx.user.email
    }, {
        emailConfirmCode: null,
        emailConfirmedAt: new Date()
    }, {
        new: true
    });

    const token = user.generateToken();

    ctx.body = { user, token };
};

const resendConfirmEmail = async ctx => {
    if (!ctx.user.emailConfirmedAt) {
        await ctx.user.sendEmailConfirmation();
        return ctx.body = {
            message: 'Email confirmation link has been sent.'
        };
    }

    ctx.body = {
        message: 'Account has been already activated.'
    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    confirmEmail,
    resendConfirmEmail
};
