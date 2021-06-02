const CampaignModel = require('../../dataBase/models/Campaign');

module.exports = {
    findCampaignById: (params) => CampaignModel.findById(params),

    createCampaign: (campaign) => new CampaignModel(campaign).save(),

    addPhotoCampaign: (campaignId, photo) => CampaignModel.findByIdAndUpdate({ _id: campaignId },
        { avatar: photo }),

    getCampaigns: () => CampaignModel.find({}),

};
