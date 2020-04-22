const Yup = require('yup');

const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6)
});

module.exports = async (ctx, next) => {
    try {
        await LoginSchema.validate(ctx.request.body);
        return next();
    } catch(error) {
        ctx.status = 422;
        ctx.body = ({
            [error.path]: error.message
        });
    }
}
