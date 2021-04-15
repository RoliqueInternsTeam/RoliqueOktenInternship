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

module.exports = influencerRouter;
