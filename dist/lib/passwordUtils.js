"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueJWT = exports.genPassword = exports.verifyPassword = void 0;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
//Get the private key
//Get the public key
const path_To_Key = path.join('private-key.pem');
const private_Key = fs.readFileSync(path_To_Key, 'utf-8');
// TODO
function verifyPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
    return hash === hashVerify;
}
exports.verifyPassword = verifyPassword;
function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
    return {
        salt: salt,
        hash: genHash
    };
}
exports.genPassword = genPassword;
function issueJWT(user) {
    const _id = user._id;
    const expireIn = "1d";
    const payload = {
        sub: _id,
        iat: Date.now()
    };
    // Sign the JWT
    const token = jwt.sign(payload, private_Key, {
        expiresIn: expireIn,
        algorithm: 'RS256'
    });
    return {
        token: "Bearer " + token,
        expires: expireIn
    };
}
exports.issueJWT = issueJWT;
