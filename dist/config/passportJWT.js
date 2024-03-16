"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_modal_js_1 = __importDefault(require("../src/model/user.modal.js"));
const fs = require("fs");
const path = require("path");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
// User
// const passport = require('passport');
// const { User } = require('../src/model/user.modal')
// const fs = require('fs');
// const path = require('path');
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
//Get the public key
const path_To_Key = path.join('public-key.pem');
const public_Key = fs.readFileSync(path_To_Key, 'utf-8');
//options
var options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: public_Key,
    algorithums: ['RS256'],
};
const strategy = new JwtStrategy(options, function (payload, done) {
    user_modal_js_1.default.findOne({ _id: payload.sub })
        .then((user) => {
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })
        .catch(err => done(err, null));
});
exports.default = {
    strategy
};
