const { Schema, model } = require('mongoose');

const profiles = {
    instagram: {
        instagramUsername: {
            type: String,
            required: false
        },
        instagramFollowers: {
            type: Number,
            required: false
        }
    },
    youtube: {
        youtubeUsername: {
            type: String,
            required: false
        },
        youtubeFollowers: {
            type: Number,
            required: false
        }
    },
    facebook: {
        facebookUsername: {
            type: String,
            required: false
        },
        facebookFollowers: {
            type: Number,
            required: false
        }
    },
    tiktok: {
        tiktokUsername: {
            type: String,
            required: false
        },
        tiktokFollowers: {
            type: Number,
            required: false
        }
    },
    twitter: {
        twitterUsername: {
            type: String,
            required: false
        },
        twitterFollowers: {
            type: Number,
            required: false
        }
    },
    blog: {
        blogUsername: {
            type: String,
            required: false
        },
        blogFollowers: {
            type: Number,
            required: false
        }
    }
};

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
    social: profiles,
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});
module.exports = model('influencer', Influencer);
