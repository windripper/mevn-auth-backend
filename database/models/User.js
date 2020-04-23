const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const config = require('../../config');
const Bcrypt = require('bcryptjs');
const randomString = require('randomstring');
const PasswordReset = require('./PasswordReset');
const { confirmAccount, passwordReset } = require('../../services/email/index');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    createdAt: Date,
    updatedAt: Date,
    password: String,
    emailConfirmedAt: Date,
    emailConfirmCode: String
});

UserSchema.pre('save', function() {
    this.password = Bcrypt.hashSync(this.password);
    this.emailConfirmCode = randomString.generate(72);

    this.createdAt = new Date();
});

UserSchema.post('save', async function() {
    await this.sendEmailConfirmation();
});

UserSchema.methods.generateToken = function() {
    return JWT.sign({ id: this._id }, config.jwtSecret);
};

UserSchema.methods.comparePasswords = function(plainPassword) {
    return Bcrypt.compareSync(plainPassword, this.password);
};

UserSchema.methods.sendEmailConfirmation = function() {

    const url = `${config.url}/auth/email/confirm/${this.emailConfirmCode}`;

    confirmAccount(this.email, this.name, url);
}

UserSchema.methods.forgotPassword = async function() {
    const token = randomString.generate(72);

    await PasswordReset.create({
        token,
        email: this.email,
        createdAt: new Date()
    })

    const url = `${config.url}/auth/password/reset/${token}`;

    await passwordReset(this.email, this.name, url);
};


module.exports = mongoose.model('User', UserSchema);
