"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import modules using ES module syntax
const http_1 = __importDefault(require("./config/http"));
const mongodb_1 = __importDefault(require("./config/mongodb"));
const JWTAuth_1 = __importDefault(require("./src/routes/JWTAuth"));
const sessions_1 = __importDefault(require("./config/sessions"));
const passport = require("passport");
const passportJWT_1 = __importDefault(require("./config/passportJWT"));
const userRoute_1 = __importDefault(require("./src/routes/userRoute"));
const dotenv = require("dotenv");
require("./config/passportLocal");
dotenv.config();
// Start the Http Server
const app = http_1.default.expressInit();
const router = http_1.default.startRouting();
// // Connect to cloud Mongo
const MONGO_DB_URL = process.env.MONGO_DB_URL ? process.env.MONGO_DB_URL : "";
mongodb_1.default.connectMongo(app, MONGO_DB_URL);
// //setting session 
sessions_1.default.setupSessionStore(app);
// //Use  Passport Auth
app.use(passport.initialize());
app.use(passport.session());
// //use JWT Passport
passport.use(passportJWT_1.default.strategy);
// start listining to routes
app.use('/anthingHereWillBeRoute', router);
// //Basic JWT routes
app.use('', (0, JWTAuth_1.default)(router));
// //User Profile Routes
app.use('', (0, userRoute_1.default)(router));
const errorHandler = (error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        statusCode: error.statusCode || 500,
        success: false,
        message: error.message || 'Internal Server Error',
        error: error.errorLog || 'An error occurred',
        stackTrace: error.errors || null,
    });
    next();
};
app.use(errorHandler);
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
http_1.default.expressStart(app, port);
// mongodb.setupSessionStore(app);
