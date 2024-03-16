"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo")); // Assuming you have the connect-mongo package installed
// Extend the SessionOptions interface to include the httpOnly property
function setupSessionStore(app) {
    app.use((0, express_session_1.default)({
        name: 'example.sid',
        secret: 'Replace with your secret key',
        resave: false,
        saveUninitialized: true,
        store: connect_mongo_1.default.create({
            mongoUrl: process.env.MONGO_DB_URL,
        }),
    }));
}
exports.default = {
    setupSessionStore
};
