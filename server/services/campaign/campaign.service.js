const CampaignModel = require('../../dataBase/models/Campaign');

module.exports = {
    findCampaignByParams: (params) => CampaignModel.findOne(params),

    createCampaign: (campaign) => new CampaignModel(campaign).save(),

    addPhotoCampaign: (campaignId, photo) => CampaignModel.findByIdAndUpdate({ _id: campaignId },
        { avatar: photo }),

    getCampaigns: () => CampaignModel.find({}),

};
