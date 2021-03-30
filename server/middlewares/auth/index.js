module.exports = {
    checkAccessToken: require('./check-access-token.middleware'),
    checkAuthUserValid: require('./validation.middleware'),
    checkPassword: require('./check-password-hash.middleware')
};
