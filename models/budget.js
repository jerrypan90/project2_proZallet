//=========================================
// Export model functions as a module
//=========================================

module.exports = (dbPool) => {
    return {
        create: (budget, callback) => {
            const queryString = 'INSERT into budget (users_id, category, budget) VALUES ($1, $2, $3)';
            const values = [budget.accountNumber, budget.category, budget.budget];

            dbPool.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        get: (id, callback) => {
            const queryString = 'SELECT * from budget where users_id=$1';
            const values = [id];

            dbPool.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        updateBudgetForm: (id, category, callback) => {
            const queryString = 'SELECT * from budget where users_id=$1 AND category=$2';
            const values = [id, category];

            dbPool.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        updateBudget: (budget, callback) => {
            const queryString = 'UPDATE budget SET category=$1, budget=$2 WHERE budget.id=$3';
            const values = [budget.category, budget.budget, parseInt(budget.id)];

            dbPool.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        deleteBudget: (id, category, callback) => {
            // const queryString = "DELETE from budget WHERE users_id=$1 AND category=$2";
            const queryString = `DELETE from budget WHERE users_id='${id}' AND category='${category}';`;
            // const values = [id, category];

            dbPool.query(queryString, (error, queryResult) => {
                callback(error, queryResult);
            });
        }
    };
};