const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    passwordHash: String
});

const user = mongoose.model('User', userSchema);

module.exports = user;