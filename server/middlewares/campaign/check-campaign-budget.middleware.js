const { ErrorHandler, errors } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        const { createCampaign } = req;
        const { budgetsTargets: { totalBudget, budgets } } = createCampaign;

        if (totalBudget) {
            const sumBudgets = Object.values(budgets).reduce((a, b) => +a + +b);

            if (+totalBudget !== sumBudgets) {
                throw new ErrorHandler(errors.WRONG_BUDGET.message, errors.WRONG_BUDGET.code);
            }
        }
        next();
    } catch (e) {
        next(e);
    }
};
