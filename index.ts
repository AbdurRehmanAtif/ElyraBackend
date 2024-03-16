// Import modules using ES module syntax
import http from './config/http';
import mongodb from './config/mongodb';
import JWTAuthRoutes from './src/routes/JWTAuth';
import session from './config/sessions';
import passport = require('passport')
import passportJWT from './config/passportJWT';
import userProfileRoutes from './src/routes/userRoute';
import dotenv = require('dotenv')
import "./config/passportLocal";
import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

dotenv.config();

// Start the Http Server
const app = http.expressInit();
const router = http.startRouting();

// // Connect to cloud Mongo
const MONGO_DB_URL = process.env.MONGO_DB_URL ? process.env.MONGO_DB_URL : "";
mongodb.connectMongo(app, MONGO_DB_URL);

// //setting session 
session.setupSessionStore(app)
// //Use  Passport Auth
app.use(passport.initialize());
app.use(passport.session());

// //use JWT Passport
passport.use(passportJWT.strategy);
// start listining to routes
app.use('/anthingHereWillBeRoute', router);

// //Basic JWT routes
app.use('', JWTAuthRoutes(router));
// //User Profile Routes
app.use('', userProfileRoutes(router));

const errorHandler: ErrorRequestHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode || 500).json({
        statusCode: error.statusCode || 500,
        success: false,
        message: error.message || 'Internal Server Error',
        error: error.errorLog || 'An error occurred',
        stackTrace: error.errors || null,
    });
    next();
};

app.use(errorHandler)


const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
http.expressStart(app, port);
// mongodb.setupSessionStore(app);


