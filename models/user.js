//=========================================
// Export model functions as a module
//=========================================

const bcrypt = require('bcrypt');

module.exports = (dbPool) => {
    return {
        create: (user, callback) => {
            const emailCheck = `SELECT * FROM users WHERE email = '${user.email}';`
            dbPool.query(emailCheck, (error1, result) => {
                if(result.rowCount>0) {
                    callback(error1, {duplicate: true});
                } else {
                    bcrypt.hash(user.password, 1, (error2, hashed) => {
                        const queryString = 'INSERT into users (name, email, password) VALUES ($1, $2, $3)';
                        const values = [
                            user.name,
                            user.email,
                            hashed
                        ];

                        dbPool.query(queryString, values, (error3, result3) => {
                            // callback(error3, queryResult);
                            const idCheck = `SELECT * FROM users WHERE email = '${user.email}';`
                            dbPool.query(idCheck, (error4, queryResult) => {
                                callback(error4, queryResult);
                            });
                        });
                    });
                }
            });
        },

        login: (user, callback) => {
            const queryString = 'SELECT * from users WHERE email=$1';
            const values = [user.email];

            dbPool.query(queryString, values, (error, queryResult) => {
                bcrypt.compare(user.password, queryResult.rows[0].password, (error, result) => {
                    callback(error, { name: queryResult.rows[0].name, userId: queryResult.rows[0].id, status: result });
                });
            });
        },

        get: (id, callback) => {
            const queryString = 'SELECT * from users WHERE id=$1';
            const values = [id];

            dbPool.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        },

        update: (user, callback) => {
            const queryString = 'UPDATE users SET name=$1, email=$2, gender=$3, age=$4, occupation=$5, salary=$6 where users.id=$7'
            const values = [user.name, user.email, user.gender, user.age, user.occupation, user.salary, parseInt(user.accountNumber)];

            dbPool.query(queryString, values, (error, queryResult) => {
                callback(error, queryResult);
            });
        }
    };
};