const { ErrorHandler, errors } = require('../../errors');
const { brandService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { name } = req.body;

        const user = await brandService.findBrandByParams({ name });

        if (user) {
            throw new ErrorHandler(errors.BRAND_ALREADY_EXIST.message, errors.BRAND_ALREADY_EXIST.code);
        }
        next();
    } catch (e) {
        next(e);
    }
};
