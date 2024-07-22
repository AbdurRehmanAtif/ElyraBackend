"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const MongoStore = require("connect-mongo");
const Session = require("express-session");
const PassportJWT = require("passport-jwt");
const PassportLocal = require("passport-local");
const user_1 = require("../../model/user");
const CryptographicService_1 = __importDefault(require("./CryptographicService"));
const apiError_1 = __importDefault(require("../../utils/apiError"));
class CPassport extends CryptographicService_1.default {
    constructor(app) {
        super();
        this.app = app;
        app.use(passport_1.default.initialize());
        app.use(passport_1.default.session());
        this.jwtStrategy = PassportJWT.Strategy;
        this.localStrategy = PassportLocal.Strategy;
        this.extractJwt = PassportJWT.ExtractJwt;
        this.options = {
            jwtFromRequest: this.extractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.PublicKey(),
            algorithums: ['RS256'],
        };
        this.setupSessionStore();
        this.seralize();
    }
    initPassportLocal() {
        return passport_1.default.use(new this.localStrategy({ usernameField: 'email' }, // Specify 'email' as the field for authentication
        function (email, password, done) {
            user_1.User.findOneByEmail(email)
                .then((user) => {
                if (user) {
                    return done(null, user);
                }
                else {
                    const foo = new apiError_1.default({ success: false, statusCode: 404, title: "Credentials Error", message: "No user found with the following credentials" });
                    return done(foo);
                }
            })
                .catch(err => {
                const foo = new apiError_1.default({ success: false, statusCode: 404, title: "Credentials Error", message: "No user found with the following credentials" });
                return done(foo);
            });
        }));
    }
    // once you initalize its a middleware, it works automatically
    //Call it at each of the route you wanna use and it will extract user from JWT token
    initPassportJWT() {
        passport_1.default.use(new this.jwtStrategy(this.options, function (payload, done) {
            console.log(payload);
            user_1.User.findOneByID(payload.sub)
                .then((user) => {
                if (user) {
                    // Include both _id and email in the request
                    const userDetails = {
                        _id: user._id,
                        email: user.email
                    };
                    return done(null, userDetails);
                }
                else {
                    const foo = new apiError_1.default({ success: false, statusCode: 404, title: "Credentials Error", message: "No user found with the following credentials" });
                    return done(null, foo);
                }
            })
                .catch(err => {
                const foo = new apiError_1.default({ success: false, statusCode: 404, title: "Credentials Error", message: "No user found with the following credentials" });
                return done(err, false, foo);
            });
        }));
    }
    setupSessionStore() {
        const url = process.env.MONGO_DB_URL;
        const mongoConnection = new MongoStore({ mongoUrl: url, collectionName: "session" });
        const session = Session({
            name: 'uuid_secret_client',
            secret: 'asdflasdklajlskd',
            resave: false,
            saveUninitialized: true,
            store: mongoConnection,
            cookie: { maxAge: 1000 * 60 * 60 * 24 }
        });
        this.app.use(session);
    }
    seralize() {
        passport_1.default.serializeUser((user, done) => {
            const userid = (user === null || user === void 0 ? void 0 : user._id) || null;
            done(null, userid);
        });
        passport_1.default.deserializeUser((userId, done) => {
            user_1.User.findById(userId)
                .then((user) => {
                const seralize = {
                    _id: user === null || user === void 0 ? void 0 : user._id
                };
                done(null, seralize);
            })
                .catch((err) => done(err));
        });
    }
}
exports.default = CPassport;
