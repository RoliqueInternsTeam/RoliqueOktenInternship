const { Schema, model } = require('mongoose');

const O_AuthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    }
});

module.exports = model('o_auth', O_AuthSchema);
