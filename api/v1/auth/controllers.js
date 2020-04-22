const User = require('../../../database/models/User');

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
}

module.exports = {
    register,
    login,
    forgotPassword
};
