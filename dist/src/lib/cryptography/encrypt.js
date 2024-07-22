"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
function encryptWithPublicKey(publicKey, dataToEncrypt) {
    // Encrypt Data with Public Key
    return crypto_1.default.publicEncrypt({
        key: publicKey,
        padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256', // Use the appropriate hash algorithm
    }, Buffer.from(dataToEncrypt, 'utf-8'));
}
function encryptWithPrivateKey(privateKey, dataToEncrypt) {
    // Encrypt Data with Public Key
    return crypto_1.default.privateEncrypt(privateKey, dataToEncrypt);
}
exports.default = {
    encryptWithPublicKey,
    encryptWithPrivateKey
};
