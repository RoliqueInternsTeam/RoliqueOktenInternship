const { Router } = require('express');
const { authController } = require('../../controllers');
const { authMiddleware, validationMiddleware } = require('../../middlewares');

const authRouter = Router();

authRouter.post('/',
    validationMiddleware.isUserCorrect,
    authMiddleware.checkPasswordHash,
    authController.login);

module.exports = authRouter;
