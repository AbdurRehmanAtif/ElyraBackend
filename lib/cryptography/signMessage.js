const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const fs = require('fs');
const encrypt = require('../cryptography/encrypt');
const decrypt = require('../cryptography/decrypt');

const myData = {
  firstName: 'aatif',
  lastName: 'atif',
  socialSecurityNumber: 'NO NO NO.  Never put personal info in a digitally \
  signed message since this form of cryptography does not hide the data!'
};

// String version of our data that can be hashed
const myDataString = JSON.stringify(myData);

// Sets the value on the hash object: requires string format, so we must convert our object
hash.update(myDataString);

// Hashed data in Hexidecimal format
const hashedData = hash.digest('hex');
const senderPrivateKey = fs.readFileSync('private-key.pem', 'utf-8');


const signedMessage = encrypt.encryptWithPrivateKey(senderPrivateKey, hashedData);

const packageOfDataToSend = {
    algorithm: 'sha256',
    originalData: myData,
    signedAndEncryptedData: signedMessage
};

module.exports.packageOfDataToSend = packageOfDataToSend;