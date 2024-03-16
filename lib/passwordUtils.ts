import crypto = require('crypto')
import jwt = require('jsonwebtoken')
import path = require('path')
import fs = require('fs')


//Get the private key


//Get the public key
const path_To_Key = path.join('private-key.pem');
const private_Key = fs.readFileSync(path_To_Key, 'utf-8');

// TODO
function verifyPassword(password: string, hash: string, salt: string) {

    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');

    return hash === hashVerify;

}
function genPassword(password: string) {

    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');

    return {
        salt: salt,
        hash: genHash
    }

}



function issueJWT(user: any) {

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
    }
}

export { verifyPassword, genPassword, issueJWT };
