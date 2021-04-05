const { Router } = require('express');

const authRouter = require('../auth/auth.router');
const usersRouter = require('../user/user.router');

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', usersRouter);

module.exports = apiRouter;
