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

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    phone: {
        type: Schema.Types.Mixed,
        required: false
    },

    avatar: {
        type: Schema.Types.Mixed,
        required: false
    }
});

module.exports = model('user', UserSchema);
