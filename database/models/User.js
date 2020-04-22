const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const config = require('../../config');
const Bcrypt = require('bcryptjs');
const randomString = require('randomstring');
const PasswordReset = require('./PasswordReset');

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

UserSchema.post('save', () => {
    console.log('saved');
});

UserSchema.methods.generateToken = function() {
    return JWT.sign({ id: this._id }, config.jwtSecret);
};

UserSchema.methods.comparePasswords = function(plainPassword) {
    return Bcrypt.compareSync(plainPassword, this.password);
};


module.exports = mongoose.model('User', UserSchema);
