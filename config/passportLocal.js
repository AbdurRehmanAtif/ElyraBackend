const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { User } = require('../src/model/user.modal')
const verifyPassword = require('../lib/passwordUtils').verifyPassword;

const verifyCallBack = async (username, password, done) => {

    try {
        const user = await User.findOne({ username: username });
        const passwordVerify = verifyPassword(password, user.hash, user.salt);
        if (!passwordVerify) { return done(null, false); }
        return done(null, user);

    } catch (error) {
        return done(null, "User not found from login section");
    }

}

const strategy = new localStrategy(verifyCallBack);
passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});


passport.deserializeUser((userId, done) => {

    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => done(err));
});
