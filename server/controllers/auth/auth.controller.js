const tokenizer = require('../../helpers/tokinizer');
const authService = require('../../services/auth/auth.service');
const { errors: { LOGIN } } = require('../../errors');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { id } = req.body;
            const token_pair = tokenizer();

            await authService.createTokenPair({ user_id: id, ...token_pair });

            res.status(LOGIN.code).json(LOGIN.message);
        } catch (e) {
            next(e);
        }
    }
};
