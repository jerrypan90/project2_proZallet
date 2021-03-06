const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const db = require('./db');

//==================================
// Configurations and set up
//==================================

// Init express app
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static('public'));

// Set handlebars to be the default view engine
const handlebarsConfig = {
    extname: 'handlebars',
    layoutsDir: 'views/layouts',
    defaultLayout: 'main'
}
app.engine('handlebars', handlebars(handlebarsConfig));
app.set('view engine', 'handlebars');

//==================================
// Routes
//==================================

// Import routes to match incoming requests
require('./routes')(app, db);

// Root GET request (it doesn't belong in any controller file)
// app.get('/', (request, response) => {
//     let loggedIn = request.cookies['loggedIn'];
//     let username = request.cookies['username'];
//     let context = {
//         loggedIn: loggedIn,
//         username: username
//     };
//     response.render('home', context);
// });

// Catch all unmatched requests and return 404 not found page
app.get('*', (request, response) => {
    response.render('404');
});

//==================================
// Listen to requests on port 3000
//==================================
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port ' + PORT + ' ~~~'));

// Run clean up actions when server shuts down
server.on('close', () => {
    console.log('Closed express server');

    // close database connection pool
    db.pool.end(() => {
        console.log('Shut down db connection pool');
    });
});