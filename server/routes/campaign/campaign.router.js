const { Router } = require('express');

const { campaignController } = require('../../controllers');
const {
    usersMiddleware,
    fileMiddleware,
    authMiddleware,
    campaignMiddleware
} = require('../../middlewares');
const { ADMIN, MANAGER } = require('../../constants/constants');

const campaignRouter = Router();

campaignRouter.use(authMiddleware.checkAccessToken);

campaignRouter.post('/',
    usersMiddleware.checkUserAccess([
        MANAGER,
        ADMIN
    ]),
    campaignMiddleware.checkCampaignValid,
    campaignMiddleware.checkBudget,
    fileMiddleware.checkFileMiddleware,
    fileMiddleware.checkPhotoCountUser,
    campaignController.createCampaign);

campaignRouter.get('/',
    usersMiddleware.checkUserAccess([]),
    campaignController.getAllCampaigns);

campaignRouter.get('/:id',
    usersMiddleware.checkUserAccess([]),
    campaignMiddleware.checkCampaignById,
    campaignController.getOneCampaign);

campaignRouter.post('/brand',
    usersMiddleware.checkUserAccess([
        MANAGER,
        ADMIN
    ]),
    campaignMiddleware.checkBrandValid,
    campaignMiddleware.checkIsBrandCreated,
    fileMiddleware.checkFileMiddleware,
    fileMiddleware.checkPhotoCountUser,
    campaignController.createBrand);

campaignRouter.get('/brand',
    usersMiddleware.checkUserAccess([
        MANAGER,
        ADMIN
    ]),
    campaignController.getAllBrands);

module.exports = campaignRouter;
