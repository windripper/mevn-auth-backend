// const { confirmAccount } = require('./sendEmail');
//
// const email = 'my-test-mail@mail.com';
// const name = 'John Doe';
// const url = 'confirm-url';
//
// confirmAccount(email, name, url);

module.exports = {
    confirmAccount: require('./sendEmail').confirmAccount,
    passwordReset: require('./sendEmail').passwordReset
}

'http://localhost:3000/auth/passwords/reset/uAhWocv9GnBxPs1Hi5eCuFBJsU3lDuePzqhth7JBIYJMJjp2TJyUd5Nqjaa0YA8eSEtw15mQ'
