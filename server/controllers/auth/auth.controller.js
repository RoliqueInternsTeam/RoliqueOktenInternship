const tokenizer = require('../../helpers/tokinizer');
const authService = require('../../services/auth/auth.service');
const { errors: { LOGIN } } = require('../../errors');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { id } = req.user;
            const token_pair = tokenizer();

            await authService.createTokenPair({ userId: id, ...token_pair });

            res.status(LOGIN.code).json(LOGIN.message);
        } catch (e) {
            next(e);
        }
    }
};
