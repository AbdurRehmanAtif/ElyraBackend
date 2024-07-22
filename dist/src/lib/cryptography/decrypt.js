"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
function decryptWithPrivateKey(privatekey, encryptedData) {
    // Decrypt Data with Private Key
    return crypto_1.default.privateDecrypt({
        key: privatekey,
        padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256', // Use the appropriate hash algorithm
    }, encryptedData);
}
function decryptWithPublicKey(p_key, encryptedData) {
    // "Decrypt" the data with the public key (not secure in practice)
    const publicDecrypt = crypto_1.default.publicDecrypt({
        key: p_key,
    }, encryptedData);
    return publicDecrypt.toString('utf-8');
}
exports.default = {
    decryptWithPrivateKey,
    decryptWithPublicKey
};
