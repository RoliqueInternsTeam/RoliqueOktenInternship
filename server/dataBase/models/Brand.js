const { Schema, model } = require('mongoose');

const Brand = new Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: Schema.Types.Mixed,
        required: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});
module.exports = model('brand', Brand);
