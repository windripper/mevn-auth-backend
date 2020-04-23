const nodemailer = require('nodemailer');
const config = require('../../config/index');
const { templateBuilder } = require('./templateBuilder');

const transport = nodemailer.createTransport({
    host: config.emailService,
    port: 2525,
    auth: {
        user: config.emailServiceLogin,
        pass: config.emailServicePassword
    }
});

const confirmAccount = (email, name, url) => {
    return new Promise((resolve, reject) => {
        templateBuilder('confirmAccount', name, url)
            .then(response => {
                const mailOptions = {
                    from: 'mevn-my-version@example.com',
                    to: email,
                    subject: 'Please confirm your account',
                    html: response
                };

                transport.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(info);
                        console.log('Email sent: ' + info.response);
                    }
                });
            })
            .catch(error => reject(error));
    });
};

const passwordReset = (email, name, url) => {
    return new Promise((resolve, reject) => {
        templateBuilder('passwordReset', name, url)
            .then(response => {
                const mailOptions = {
                    from: 'mevn-my-version@example.com',
                    to: email,
                    subject: 'Password reset',
                    html: response
                };

                transport.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(info);
                        console.log('Email sent: ' + info.response);
                    }
                });
            })
            .catch(error => reject(error));
    });
};

module.exports = {
    confirmAccount,
    passwordReset
};
