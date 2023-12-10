const mongoose = require('mongoose');
const encrypt = require('../../lib/cryptography/encrypt');
const decrypt = require('../../lib/cryptography/decrypt');
const fs = require('fs');


const userAddressSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        address: { type: String },
        suburb: { type: String },
        state: { type: String },
        postcode: { type: String }
    }
)

userAddressSchema.pre('findOneAndUpdate', async function (next) {
    // 'this' refers to the query being executed
    const update = this.getUpdate();

    // Check if there is an update and it includes $set
    if (update.$set) {
        const publicKey = fs.readFileSync('public-key.pem', 'utf-8');

        // Iterate over the keys in $set
        for (const key in update.$set) {
            if (
                Object.prototype.hasOwnProperty.call(update.$set, key) &&
                key !== 'userId' && // Exclude userId
                key !== '_id' // Exclude Id (adjust to match your actual field names)
            ) {
                // Apply encryption logic to each field
                const encryptedData = encrypt.encryptWithPublicKey(publicKey, update.$set[key]);
                update.$set[key] = encryptedData.toString('base64');
            }
        }
    }

    next();
});


userAddressSchema.post('findOneAndUpdate', async function (doc) {

    const update = this.getUpdate();

    if (update.$set && doc) {

        const privateKey = fs.readFileSync('private-key.pem', 'utf-8');

        for (const key in update.$set) {
            if (
                Object.prototype.hasOwnProperty.call(update.$set, key) &&
                key !== 'userId' && // Exclude userId
                key !== '_id' // Exclude Id (adjust to match your actual field names)
            ) {
                const encryptedData = Buffer.from(update.$set[key], 'base64');
                const result = decrypt.decryptWithPrivateKey(privateKey, encryptedData)
                doc[key] = result.toString('utf-8');
            }
        }
    }
});

const UserAddress = mongoose.model('Address', userAddressSchema);

module.exports = {
    UserAddress
};