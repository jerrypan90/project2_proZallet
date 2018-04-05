const pg = require('pg');
const user = require('./models/user');
const budget = require('./models/budget');

const configs = {
    user: 'jerrypan',
    host: '127.0.0.1',
    database: 'zallet',
    port: 5432
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack);
});

module.exports = {
    pool: pool,
    user: user(pool),
    budget: budget(pool)
};