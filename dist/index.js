"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import modules using ES module syntax
const http_1 = __importDefault(require("./config/http"));
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const SessionHandshake_1 = __importDefault(require("./src/routes/SessionHandshake"));
const sessions_1 = __importDefault(require("./config/sessions"));
const profileRoutes_1 = __importDefault(require("./src/routes/profileRoutes"));
const dotenv = require("dotenv");
require("./config/passportLocal");
const databaseProviderFactory_1 = require("./src/factory/databaseProviderFactory");
const Passport_1 = __importDefault(require("./lib/security/Passport"));
dotenv.config();
// Start the Http Server
const app = http_1.default.expressInit();
const router = http_1.default.startRouting();
const dbFactory = new databaseProviderFactory_1.DatabaseProviderFactory();
const databaseType = [databaseProviderFactory_1.DatabaseType.MongoDB];
dbFactory.createDatabaseProviders(databaseType);
// //setting session 
sessions_1.default.setupSessionStore(app);
// //Use  Passport Auth
// app.use(passport.session());
// //use JWT Passport
const cPassport = new Passport_1.default(app);
cPassport.initPassportJWT();
cPassport.initPassportLocal();
//Session Routes
app.use('', (0, SessionHandshake_1.default)(router));
// // //Basic JWT routes
app.use('', (0, authRoutes_1.default)(router));
// // //User Profile Routes
app.use('', (0, profileRoutes_1.default)(router));
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
