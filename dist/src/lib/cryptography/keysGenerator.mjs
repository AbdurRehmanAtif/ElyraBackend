"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
// Generate Key Pair
const { privateKey, publicKey } = crypto_1.default.generateKeyPairSync('rsa', {
    modulusLength: 2048, // You can adjust the length based on your security requirements
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    },
});
// Write Private Key to File
fs_1.default.writeFileSync('private-keyReact.pem', privateKey, 'utf-8');
console.log('Private Key written to private-key.pem');
// Write Public Key to File
fs_1.default.writeFileSync('public-keyReact.pem', publicKey, 'utf-8');
console.log('Public Key written to public-key.pem');
