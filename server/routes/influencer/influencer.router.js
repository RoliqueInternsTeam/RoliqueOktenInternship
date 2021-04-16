const { Router } = require('express');

const { influencerController } = require('../../controllers');
const {
    usersMiddleware,
    fileMiddleware,
    authMiddleware,
    influencerMiddleware
} = require('../../middlewares');
const { ADMIN, MANAGER } = require('../../constants/constants');

const influencerRouter = Router();

influencerRouter.post('/',
    authMiddleware.checkAccessToken,
    usersMiddleware.checkUserAccess([
        MANAGER,
        ADMIN
    ]),
    influencerMiddleware.checkInfluencerValid,
    fileMiddleware.checkFileMiddleware,
    fileMiddleware.checkPhotoCountUser,
    influencerController.createInfluencer);
influencerRouter.put('/:id',
    authMiddleware.checkAccessToken,
    usersMiddleware.checkUserAccess({
        ADMIN,
        MANAGER
    }),
    influencerMiddleware.checkInfluencerById,
    influencerMiddleware.checkUpdateInfluencerValid,
    fileMiddleware.checkFileMiddleware,
    fileMiddleware.checkPhotoCountUser,
    influencerController.updateInfluencer);
influencerRouter.get('/',
    authMiddleware.checkAccessToken,
    usersMiddleware.checkUserAccess([]),
    influencerController.getAllInfluencers);

module.exports = influencerRouter;
