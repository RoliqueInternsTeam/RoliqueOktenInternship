const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    phone: {
        type: Schema.Types.Mixed,
        required: false
    },

    avatar: {
        type: String,
        required: false
    }
});

module.exports = model('user', UserSchema);
