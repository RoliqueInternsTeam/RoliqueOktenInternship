const { Router } = require('express');

const { userController } = require('../../controllers');

const userRouter = Router();

userRouter.post('/', userController.createUser);

module.exports = userRouter;
