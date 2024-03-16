"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
function expressInit() {
    // create express connection
    const app = express();
    // let the api use json requests
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    // Middleware to set CORS headers
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    return app;
}
function expressStart(app, PORT) {
    // start the app on specific PORT
    app.listen(PORT, () => {
        console.log(`App is listening to ${process.env.PORT}`);
    });
}
function startRouting() {
    const router = express.Router();
    router.get('/', (req, res, next) => {
        res.send('Server is Responsing');
    });
    return router;
}
exports.default = {
    expressInit,
    expressStart,
    startRouting
};
