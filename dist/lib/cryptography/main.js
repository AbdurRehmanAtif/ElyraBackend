"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encrypt_1 = __importDefault(require("./encrypt"));
const decrypt_1 = __importDefault(require("./decrypt"));
const fs_1 = __importDefault(require("fs"));
const message = "Here is my message to encrypt";
// Read Public Key from File
const publicKey = fs_1.default.readFileSync('../../public-key.pem', 'utf-8');
const encryptedData = encrypt_1.default.encryptWithPublicKey(publicKey, message);
// Display Encrypted Dataclear
//base64
console.log('Encrypted Data:\n', encryptedData.toString('base64'));
// Read Private Key from File
const privateKey = fs_1.default.readFileSync('../../private-key.pem', 'utf-8');
const data = decrypt_1.default.decryptWithPrivateKey(privateKey, encryptedData);
console.log(data.toString());
