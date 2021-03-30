const { Router } = require('express');
const { authController } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

const authRouter = Router();

authRouter.post('/',
    authMiddleware.checkAuthUserValid,
    authMiddleware.checkPassword,
    authController.login);

module.exports = authRouter;
