//=========================================
// Export model functions as a module
//=========================================

module.exports = (dbPool) => {
    return {
        get: (id, callback) => {
            const queryString = `SELECT * from expense WHERE users_id='${id}';`;

            dbPool.query(queryString, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        create: (expense, callback) => {
            const queryString = `INSERT into expense (users_id, date, category, remark, spent) VALUES ('${expense.accountNumber}', '${expense.date}', '${expense.category}', '${expense.remark}', '${expense.spent}');`;
            
            dbPool.query(queryString, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        updateExpenseForm: (id, no, callback) => {
            const queryString = `SELECT * from expense WHERE users_id='${id}' AND id='${no}';`;

            dbPool.query(queryString, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        updateExpense: (expense, callback) => {
            const queryString = `UPDATE expense SET date='${expense.date}', category='${expense.category}', remark='${expense.remark}', spent='${expense.spent}' WHERE id='${expense.id}';`;

            dbPool.query(queryString, (error,queryResult) => {
                callback(error, queryResult);
            });
        },

        deleteExpense: (id, no, callback) => {
            const queryString = `DELETE from expense WHERE users_id='${id}' AND id='${no}';`;

            dbPool.query(queryString, (error, queryResult) => {
                callback(error, queryResult);
            });
        }
    };
};