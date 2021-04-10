const { Router } = require('express');
const { authController } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

const authRouter = Router();

authRouter.post('/',
    authMiddleware.checkAuthUserValid,
    authMiddleware.checkPassword,
    authController.login);
authRouter.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);

module.exports = authRouter;
