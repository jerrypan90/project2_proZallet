//=========================================
// Controller logic
//=========================================

// form to create user
const registrationForm = (request, response) => {
    response.render('user/register');
};

// create user function
const create = (db) => {
    return (request, response) => {
        db.user.create(request.body, (error, queryResult) => {
            if (error) {
                console.error('error getting user', error);
                response.sendStatus(500);
            };

            if (queryResult.duplicate === true) {
                response.render('user/register', {duplicateEmail: true});
            } else {
                response.cookie('loggedIn', true);
                response.cookie('username', request.body.name);
                response.cookie('userId', queryResult.rows[0].id);
                response.redirect('/');
            }
        });
    };
};

// logout function
const logout = (request, response) => {
    response.clearCookie('loggedIn');
    response.clearCookie('username');
    response.clearCookie('userId');
    response.redirect('/');
};

// form to login
const loginForm = (request, response) => {
    let context = {
        loggedIn: request.cookies['loggedIn'],
        username: request.cookies['username']
    };
    response.render('user/login', context);
};

// login function
const login = (db) => {
    return (request, response) => {
        db.user.login(request.body, (error, queryResult) => {

            if (queryResult.status === false) {
                response.render('user/login', {invalidUser: true});
            } else {
                response.cookie('loggedIn', true);
                response.cookie('username', queryResult.name);
                response.cookie('userId', queryResult.userId);
                response.redirect('/user/dashboard');
            }
        });
    };
};

// form to update
const updateInfo = (db) => {
    return(request, response) => {
        db.user.get(request.params.id, (error, queryResult) => {
            if (error) {
                response.end('Invalid User');
            } else {
                response.render('user/editinfo', { user: queryResult.rows[0] });
            }
        });
    };
};

const update = (db) => {
    return(request, response) => {
        db.user.update(request.body, (error, queryResult) => {
            // let userId = request.params.id;

            if (error) {
                // response.end("Sorry, your changes could not be saved.");
                console.error('error updating user', error);
                response.sendStatus(500);
            } else {
                //response.redirect('/' + 'user/' + userId + '/edit');
                response.redirect('/user/dashboard');
            }
        });
    };
};

const dashboard = (request, response) => {
    let context = {
        loggedIn: request.cookies['loggedIn'],
        username: request.cookies['username'],
        userId: request.cookies['userId']
    };
    response.render('user/dashboard', context);
};

const budgetForm = (db) => {
        return(request, response) => {
            db.budget.get(request.params.id, (error, queryResult) => {
                if(error) {
                    response.end('Unable to display budget')
                } else {
                    response.render('user/budget', { budget: queryResult.rows, userId: request.cookies['userId'] });
                };
            });
    };
};

const createBudget = (db) => {
    return(request, response) => {
        db.budget.create(request.body, (error, queryResult) => {
            if (error) {
                console.error('error setting budget', error);
                response.sendStatus(500);
            } else {
                response.redirect('/user/dashboard');
            }
        });
    };
};

const updateBudgetForm = (db) => {
    return(request,response) => {
        db.budget.updateBudgetForm(request.params.id, request.params.category, (error, queryResult) => {
            if(error) {
                response.end('error displaying budget');
            } else {
                response.render('user/editbudget', { budget: queryResult.rows, userId: request.cookies['userId'] });
            }
        });
    };
};

const updateBudget = (db) => {
    return(request, response) => {
        db.budget.updateBudget(request.body, (error, queryResult) => {
            let userId = request.params.id;
            console.log(queryResult);
            if(error) {
                console.error('error updating budget', error);
                response.sendStatus(500);
            } else {
                response.redirect('/' + 'user/budget/' + userId);
            }
        });
    };
};

//=========================================
// Export controller functions as a module
//=========================================

module.exports = {
    registrationForm,
    create,
    logout,
    loginForm,
    login,
    updateInfo,
    update,
    dashboard,
    budgetForm,
    createBudget,
    updateBudgetForm,
    updateBudget
};