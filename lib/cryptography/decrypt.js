const crypto = require('crypto');


function decryptWithPrivateKey(privatekey, encryptedData) {
    // Decrypt Data with Private Key
    return crypto.privateDecrypt({
        key: privatekey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256', // Use the appropriate hash algorithm
    }, encryptedData);
}

function decryptWithPublicKey(p_key, encryptedData) {

    // "Decrypt" the data with the public key (not secure in practice)
    const publicDecrypt = crypto.publicDecrypt({
        key: p_key,
    }, encryptedData);
    return publicDecrypt.toString('utf-8');
}

module.exports = {
    decryptWithPrivateKey,
    decryptWithPublicKey

};