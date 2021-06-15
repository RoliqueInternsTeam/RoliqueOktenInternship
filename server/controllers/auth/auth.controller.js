const tokenizer = require('../../helpers/tokinizer');
const authService = require('../../services/auth/auth.service');
const { AUTHORIZATION } = require('../../constants/constants');
const { NO_CONTENT } = require('../../constants/status-codes');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user } = req;
            const token_pair = tokenizer();

            await authService.createTokenPair({ userId: user.id, ...token_pair });

            res.json({ ...token_pair, user });
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const { refresh_token, userId } = req.token;

            await authService.deleteByParams({ refresh_token });

            const token_pair = tokenizer();

            await authService.createTokenPair({ userId, ...token_pair });

            res.json(token_pair);
        } catch (e) {
            next(e);
        }
    },
    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await authService.deleteByParams({ access_token });

            res.status(NO_CONTENT).json('User logout');
        } catch (e) {
            next(e);
        }
    },

};
