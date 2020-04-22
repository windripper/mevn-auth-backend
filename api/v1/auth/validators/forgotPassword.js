const Yup = require('yup');
const User = require('../../../../database/models/User');
const PasswordReset = require('../../../../database/models/PasswordReset');


const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email().required()
});

module.exports = async (ctx, next) => {
    try {

        await ForgotPasswordSchema.validate(ctx.request.body);

        const { email } = ctx.request.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Yup.ValidationError(
                'This user does not exist',
                ctx.request.body,
                'email'
            );
        }

        const existingReset = await PasswordReset.findOne({ email });

        if (existingReset) {
            throw new Yup.ValidationError(
                'Password reset link has already been sent',
                ctx.request.body,
                'email'
            );
        }

        ctx.user = user;

        next();
    } catch(error) {
        ctx.status = 422;
        ctx.body = ({
            [error.path]: error.message
        });
    }
}
