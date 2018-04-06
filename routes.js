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
    app.post('/user/dashboard', user.login(db));

    // registered user dashboard
    app.get('/user/dashboard', user.dashboard);

    // edit user information
    app.get('/user/:id/edit', user.updateInfo(db));
    app.put('/user/:id', user.update(db));

    // input budget
    app.get('/user/budget/:id', user.budgetForm(db));
    app.post('/user/budget/:id', user.createBudget(db));

    // edit budget
    app.get('/user/budget/:id/edit/:category', user.updateBudgetForm(db));
    app.put('/user/budget/:id', user.updateBudget(db));

    // delete budget
    app.delete('/user/budget/:id/delete/:category', user.deleteBudget(db));

    // add expense
    app.get('/user/expense/:id', user.expenseForm(db));
    app.post('/user/expense/:id', user.createExpense(db));

    // edit expense
    app.get('/user/expense/:id/edit/:no', user.updateExpenseForm(db));
    app.put('/user/expense/:id', user.updateExpense(db));

    // delete expense
    app.delete('/user/expense/:id/delete/:no', user.deleteExpense(db));

    // home with login form
    app.get('/', user.loginForm);
};
