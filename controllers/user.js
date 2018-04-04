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
                response.redirect('/');
            }
        });
    };
};

// logout function
const logout = (request, response) => {
    response.clearCookie('loggedIn');
    response.redirect('/');
};

// form to login
const loginForm = (request, response) => {
    response.render('user/login');
};

// login function
const login = (db) => {
    return (request, response) => {
        db.user.login(request.body, (error, queryResult) => {
            if (queryResult.status === false) {
                response.render('user/login', {invalidUser: true});
            } else {
                response.cookie('loggedIn', true);
                response.redirect('/');
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
                console.log(queryResult.rows[0]);
                response.render('user/editinfo', { user: queryResult.rows[0] });
            }
        });
    };
};

const update = (db) => {
    return(request, response) => {
        db.user.update(request.body, (error, queryResult) => {
            let userId = request.params.id;

            if (error) {
                // response.end("Sorry, your changes could not be saved.");
                console.error('error updating user', error);
                response.sendStatus(500);
            } else {
                response.redirect('user/' + userId);
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
    update
};