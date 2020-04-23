const path = require('path');
const ejs = require('ejs');

const templates = {
    confirmAccount: path.join(__dirname, 'views', 'confirmAccount.ejs'),
    passwordReset: path.join(__dirname, 'views', 'passwordReset.ejs')
};

module.exports.templateBuilder = (template, name, url) => {
    return new Promise(((resolve, reject) => {
        ejs.renderFile(templates[template], { name, url }, (err, html) => {
            if (err) {
                console.log(err);
                return reject(err);
            } else {
                resolve(html);
            }
        });
    }));
};
