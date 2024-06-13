"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_local_1 = require("passport-local");
const verifyCallBack = (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = await User.findOne({ username: username });
        // const passwordVerify: boolean = user?.hash && user?.salt ? verifyPassword(password, user.hash, user.salt) : false;
        // if (!passwordVerify) { return done(null, false); }
        // return done(null, user);
    }
    catch (error) {
        return done(null, "User not found from login section");
    }
});
const strategy = new passport_local_1.Strategy(verifyCallBack);
passport.use(strategy);
// user._id
passport.serializeUser((user, done) => {
    const userid = (user === null || user === void 0 ? void 0 : user._id) || null;
    done(null, userid);
});
passport.deserializeUser((userId, done) => {
    // User.findById(userId)
    //     .then((user) => {
    //         done(null, user);
    //     })
    //     .catch((err) => done(err));
});
