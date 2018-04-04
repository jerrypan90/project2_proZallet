const user = require('./controllers/user');

module.exports = (app, db) => {
    //==================================
    // User
    //==================================

    // create user
    app.get('/user/register', user.registrationForm);
    app.post('/user', user.create(db));

    // login and logout
    app.post('/user/logout', user.logout);
    app.get('/user/login', user.loginForm);
    app.post('/user/login', user.login(db));

    // edit user information
    app.get('/user/:id/edit', user.updateInfo(db));
    app.put('/user/:id', user.update(db));
};
