const crypto = require('crypto');
const fs = require('fs');
const decrypt = require('../cryptography/decrypt');

// This is the data that we are receiving from the sender
const receivedData = require('../cryptography/signMessage').packageOfDataToSend;

const hash = crypto.createHash(receivedData.algorithm);
const publicKey = fs.readFileSync('public-key.pem', 'utf-8');
const decryptedMessage = decrypt.decryptWithPublicKey(publicKey, receivedData.signedAndEncryptedData);
const decryptedMessageHex = decryptedMessage;

const hashOfOriginal = hash.update(JSON.stringify(receivedData.originalData));
const hashOfOriginalHex = hash.digest('hex');

if (hashOfOriginalHex === decryptedMessageHex) {
    console.log('Success!  The data has not been tampered with and the sender is valid.')
} else {
    console.log('Uh oh... Someone is trying to manipulate the data or someone else is sending this!  Do not use!');
}