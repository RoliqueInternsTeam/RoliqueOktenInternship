const { Schema, model } = require('mongoose');

const budgetsAndTargets = {
    totalBudget: {
        type: Number,
        required: false
    },
    budgets: {
        influencerBudget: {
            type: Number,
            required: false
        },
        socialAdsMediaBudget: {
            type: Number,
            required: false
        },
        productionBudget: {
            type: Number,
            required: false
        },
        travelBudget: {
            type: Number,
            required: false
        },
        handlingFee: {
            type: Number,
            required: false
        },
        otherBudget: {
            type: Number,
            required: false
        }
    }
};

const Campaign = new Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    effort: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    hashtags: {
        type: Array,
        required: false,
        default: undefined
    },
    brand: {
        type: String,
        required: true
    },
    teamLead: {
        type: String,
        required: true
    },
    campaignLogo: {
        type: Schema.Types.Mixed,
        required: false
    },
    clientDescription: {
        type: String,
        required: false
    },
    internalNotes: {
        type: String,
        required: false
    },
    budgetsTargets: budgetsAndTargets,
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    social: {
        type: Array,
        default: [
            'instagram',
            'youtube,',
            'facebook',
            'tiktok',
            'twitter',
            'blog'
        ]
    },
    profit: {
        type: String,
        default: '60000'
    }
});
module.exports = model('campaign', Campaign);
