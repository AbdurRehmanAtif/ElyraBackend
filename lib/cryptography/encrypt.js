const crypto = require('crypto');

function encryptWithPublicKey(publicKey, dataToEncrypt) {
    // Encrypt Data with Public Key
    return crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256', // Use the appropriate hash algorithm
    }, Buffer.from(dataToEncrypt, 'utf-8'));

}

function encryptWithPrivateKey(privateKey, dataToEncrypt) {
    // Encrypt Data with Public Key
    return crypto.privateEncrypt(privateKey, dataToEncrypt);

}

module.exports = {
    encryptWithPublicKey,
    encryptWithPrivateKey
};

