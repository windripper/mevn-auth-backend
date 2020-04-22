const mongoose = require('mongoose');

const PasswordResetSchema = new mongoose.Schema({
    email: String,
    token: String,
    createdAt: Date
});

module.exports = mongoose.model('PasswordReset', PasswordResetSchema);
