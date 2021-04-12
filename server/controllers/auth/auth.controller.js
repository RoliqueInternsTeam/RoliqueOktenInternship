const tokenizer = require('../../helpers/tokinizer');
const authService = require('../../services/auth/auth.service');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { id, role } = req.user;
            const token_pair = tokenizer();

            await authService.createTokenPair({ userId: id, ...token_pair });

            res.json({ token_pair, role });
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

};
