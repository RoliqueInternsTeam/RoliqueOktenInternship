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

influencerRouter.use(authMiddleware.checkAccessToken);

influencerRouter.post('/',
    usersMiddleware.checkUserAccess([
        MANAGER,
        ADMIN
    ]),
    influencerMiddleware.checkInfluencerValid,
    fileMiddleware.checkFileMiddleware,
    fileMiddleware.checkPhotoCountUser,
    influencerController.createInfluencer);
influencerRouter.put('/:id',
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
    usersMiddleware.checkUserAccess([]),
    influencerController.getAllInfluencers);
influencerRouter.get('/:id',
    usersMiddleware.checkUserAccess([]),
    influencerController.getOneInfluencer);

module.exports = influencerRouter;
