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
        }
    };
};