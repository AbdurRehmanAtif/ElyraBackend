const http = require('./config/http');
const mongodb = require('./config/mongodb');
const routing = require('./src/routes/index');
const JWTAuthRoutes = require('./src/routes/JWTAuth');
const session = require('./config/sessions');
const passport = require('passport');
const passportJWT = require('./config/passportJWT');
const userRoute = require('./src/routes/userRoute');


require('dotenv').config();
require('./config/passportLocal');

// Start the Http Server
const app = http.expressInit();
// Connect to cloud Mongo
mongodb.connectMongo(app, process.env.MONGO_DB_URL);

//setting session 
session.setupSessionStore(app)
//Use  Passport Auth
app.use(passport.initialize());
app.use(passport.session());

//use JWT Passport
passport.use(passportJWT.strategy);

app.use('/', routing);

//Basic JWT routes
app.use('', JWTAuthRoutes(app));
//User Profile Routes
app.use('', userRoute(app));

app.use((error, req, res, next) => {

    res.status(error.statusCode)
        .json({
            statusCode: error.statusCode,
            success: false,
            message: error.message,
            error: error.errorLog,
            stackTrace: error.errors
        })
    next()
})




http.expressStart(app, process.env.PORT);
// mongodb.setupSessionStore(app);

