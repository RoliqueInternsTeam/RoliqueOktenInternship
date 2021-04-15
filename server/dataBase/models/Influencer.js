const { Schema, model } = require('mongoose');

const Influencer = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthdate: {
        type: Number,
        required: false
    },
    profession: {
        type: String,
        required: true
    },
    avatar: {
        type: Schema.Types.Mixed,
        required: false
    },
    socialProfileInstagram: {
        type: String,
        required: false
    },
    instagramFollowers: {
        type: Number,
        required: false
    },
    socialProfileYouTube: {
        type: String,
        required: false
    },
    youTubeFollowers: {
        type: Number,
        required: false
    },
    socialProfileFacebook: {
        type: String,
        required: false
    },
    facebookFollowers: {
        type: Number,
        required: false
    },
    socialProfileTiktok: {
        type: String,
        required: false
    },
    tiktokFollowers: {
        type: Number,
        required: false
    },
    socialProfileTwitter: {
        type: String,
        required: false
    },
    twitterFollowers: {
        type: Number,
        required: false
    },
    socialProfileBlog: {
        type: String,
        required: false
    },
    blogFollowers: {
        type: Number,
        required: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = model('influencer', Influencer);
