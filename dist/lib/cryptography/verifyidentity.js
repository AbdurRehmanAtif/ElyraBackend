"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const decrypt_1 = __importDefault(require("./decrypt"));
const fs_1 = __importDefault(require("fs"));
function verifuIdentity() {
    // This is the data that we are receiving from the sender
    const receivedData = require('../cryptography/signMessage').packageOfDataToSend;
    const hash = crypto_1.default.createHash(receivedData.algorithm);
    const publicKey = fs_1.default.readFileSync('../../public-key.pem', 'utf-8');
    const decryptedMessage = decrypt_1.default.decryptWithPublicKey(publicKey, receivedData.signedAndEncryptedData);
    const decryptedMessageHex = decryptedMessage;
    hash.update(JSON.stringify(receivedData.originalData));
    const hashOfOriginalHex = hash.digest('hex');
    if (hashOfOriginalHex === decryptedMessageHex) {
        return true;
    }
    else {
        return false;
    }
}
