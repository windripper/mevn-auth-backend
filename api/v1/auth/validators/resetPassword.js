const Yup = require('yup');
const User = require('../../../../database/models/User');
const PasswordReset = require('../../../../database/models/PasswordReset');

const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().min(6).required()
});

module.exports = async (ctx, next) => {
    try {

        const { password, token } = ctx.request.body;

        console.log(token);

        await ResetPasswordSchema.validate({ password });
        const existingReset = await PasswordReset.findOne({ token });

        if (!existingReset) {
            throw new Yup.ValidationError(
                'Invalid reset token',
                ctx.request.body,
                'token'
            );
        }

        const timeInMinutes = Math.ceil((new Date().getTime() - new Date(existingReset.createdAt).getTime()) / 60000);

        if (timeInMinutes > 5) {

            await PasswordReset.findOneAndDelete({ token });

            throw new Yup.ValidationError(
                `Reset token expired ${timeInMinutes - 5} minutes ago`,
                ctx.request.body,
                'token'
            );
        }

        ctx.user = await User.findOne({ email: existingReset.email });

        return next();
    } catch(error) {
        ctx.status = 422;
        ctx.body = {
            [error.path]: error.message
        };
    }
};
