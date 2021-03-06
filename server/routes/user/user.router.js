const { Router } = require('express');

const { userController } = require('../../controllers');
const { usersMiddleware, fileMiddleware, authMiddleware } = require('../../middlewares');

const userRouter = Router();

userRouter.post('/',
    authMiddleware.checkAccessToken,
    usersMiddleware.checkUserValid,
    fileMiddleware.checkFileMiddleware,
    usersMiddleware.checkIsUserCreated,
    fileMiddleware.checkPhotoCountUser,
    userController.createUser);
userRouter.put('/:id',
    );
module.exports = userRouter;
