const Yup = require('yup');
const User = require('../../../../database/models/User');

const EmailConfirmSchema = Yup.object().shape({
    token: Yup.string().required()
});

module.exports = async (ctx, next) => {
    try {

        const { token } = ctx.request.body;

        await EmailConfirmSchema.validate({ token });

        const user = await User.findOne({ emailConfirmCode: token });

        if (!user) {
            throw new Yup.ValidationError(
                'Invalid confirmation code',
                ctx.request.body,
                'token'
            );
        }

        ctx.user = user;

        return next();
    } catch(error) {
        ctx.status = 422;
        ctx.body = {
            [error.path]: error.message
        };
    }

};
