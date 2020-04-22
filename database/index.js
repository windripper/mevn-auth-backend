const Mongoose = require('mongoose');
const config = require('../config');

module.exports = Mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('[DB] Connected to database.'))
    .catch(err => console.log(err));
