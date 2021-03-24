module.exports = {
    authMiddleware: require('./auth/check-password-hash.middleware'),
    validationMiddleware: require('./validation/validation.middleware')
};
