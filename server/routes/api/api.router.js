const { Router } = require('express');


const authRouter = require('../auth/auth.router');
const userRouter = require('../user/user.router');
const influencerRouter = require('../influencer/influencer.router');
const campaignRouter = require('../campaign/campaign.router')

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/influencer', influencerRouter);
apiRouter.use('/campaign', campaignRouter);

module.exports = apiRouter;
