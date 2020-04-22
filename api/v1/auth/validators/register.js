const User = require('../../../../database/models/User');
const Yup = require('yup');

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6)
});

module.exports = async (ctx, next) => {
    const { name, email, password } = ctx.request.body;

    try {
        await RegisterSchema.validate({ name, email, password });

        const isExist = await User.findOne({ email });

        if (isExist) {
            throw new Yup.ValidationError(
                'This user already exists.',
                ctx.request.body,
                'email'
            );
        }

        // TODO figure out why it didn't work without return
        return next();
    } catch(error) {
        ctx.status = error.status || 422;
        ctx.body = ({
            [error.path]: error.message
        });
    }
};
