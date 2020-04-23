const JWT = require('jsonwebtoken');
const User = require('../../../../database/models/User');
const config = require('../../../../config/index');

module.exports = async (ctx, next) => {
    try {

        const token = ctx.request.headers.access_token;
        const data = JWT.verify(token, config.jwtSecret);
        const user = await User.findById(data.id);

        if (!user) {
            throw new Error();
        }

        ctx.user = user;

        return next();
    } catch(error) {
        ctx.status = 422;
        ctx.body = {
            error
        };
    }
}
