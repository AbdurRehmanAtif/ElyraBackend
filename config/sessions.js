const MongoStore = require('connect-mongo');
const session = require('express-session');

function setupSessionStore(app) {

    app.use(session({
        name: 'example.sid',
        secret: 'Replace with your secret key',
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 7,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_DB_URL,
            collection: "sessions"

        })
    }));
}


module.exports = {
    setupSessionStore
};