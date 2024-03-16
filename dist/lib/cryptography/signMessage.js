"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const hash = crypto_1.default.createHash('sha256');
const fs_1 = __importDefault(require("fs"));
const encrypt_1 = __importDefault(require("./encrypt"));
const myData = {
    id: "as98d7a98s7d9as7d9a7s9a7s"
};
// String version of our data that can be hashed
const myDataString = JSON.stringify(myData);
// Sets the value on the hash object: requires string format, so we must convert our object
hash.update(myDataString);
// Hashed data in Hexidecimal format
const hashedData = hash.digest('hex');
const senderPrivateKey = fs_1.default.readFileSync('../../private-key.pem', 'utf-8');
const signedMessage = encrypt_1.default.encryptWithPrivateKey(senderPrivateKey, hashedData);
const packageOfDataToSend = {
    algorithm: 'sha256',
    originalData: myData,
    signedAndEncryptedData: signedMessage
};
module.exports.packageOfDataToSend = packageOfDataToSend;
