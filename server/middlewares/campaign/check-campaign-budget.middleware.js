const { ErrorHandler, errors } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        const campaign = req.body;
        const { budgetsTargets: { totalBudget, budgets } } = campaign;

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
