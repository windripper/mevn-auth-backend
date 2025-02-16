require('dotenv').config();

module.exports = {
    url: process.env.HOST_URL || 'http://localhost:3000',
    port: process.env.PORT || 3000,
    dbUrl: process.env.DB_URL ||'mongodb://localhost:27017/mevn-my-version',
    jwtSecret: process.env.JWT_SECRET || 'jwt secret',
    emailService: process.env.EMAIL_SENDER_SERVICE || 'smtp.mailtrap.io',
    emailServiceLogin: process.env.EMAIL_SENDER_LOGIN || '4713d787287cca',
    emailServicePassword: process.env.EMAIL_SENDER_PASSWORD || '3feb48c6cbd560',
};
