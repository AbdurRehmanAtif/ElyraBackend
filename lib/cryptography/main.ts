import encrypt from "./encrypt";
import decrypt from "./decrypt";
import fs from 'fs';


const message = "Here is my message to encrypt";
// Read Public Key from File
const publicKey = fs.readFileSync('../../public-key.pem', 'utf-8');
const encryptedData = encrypt.encryptWithPublicKey(publicKey, message)

// Display Encrypted Dataclear
//base64
console.log('Encrypted Data:\n', encryptedData.toString('base64'));


// Read Private Key from File
const privateKey = fs.readFileSync('../../private-key.pem', 'utf-8');
const data = decrypt.decryptWithPrivateKey(privateKey, encryptedData)
console.log(data.toString());
