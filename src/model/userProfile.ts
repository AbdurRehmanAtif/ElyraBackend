import mongoose from 'mongoose';
const encrypt: any = require('../../lib/cryptography/encrypt.js');
const decrypt: any = require('../../lib/cryptography/decrypt.js');
import fs from 'fs';


const userProfileSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        firstName: { type: String },
        lastName: { type: String },
        dateOfBirth: { type: String },
        about: { type: String },
        phone: { type: String },
        gender: { type: String },
        avatar: { type: String },
        coverImage: { type: String },
    })

userProfileSchema.pre('findOneAndUpdate', async function (next) {
    // 'this' refers to the query being executed
    const update = this.getUpdate();

    // Check if there is an update and it includes $set
    if (update && ('$set' in update)) {
        const publicKey = fs.readFileSync('public-key.pem', 'utf-8');

        // Iterate over the keys in $set
        for (const key in update.$set) {
            if (
                Object.prototype.hasOwnProperty.call(update.$set, key) &&
                key !== 'userId' && // Exclude userId
                key !== '_id' &&
                key !== '__v'// Exclude Id (adjust to match your actual field names)/
            ) {
                // Apply encryption logic to each field
                const encryptedData = encrypt.encryptWithPublicKey(publicKey, update.$set[key]);
                update.$set[key] = encryptedData.toString('base64');
            }
        }
    }

    next();
});


userProfileSchema.post('findOneAndUpdate', async function (doc) {

    const update = this.getUpdate() as any

    if (update?.$set && doc) {

        const privateKey = fs.readFileSync('private-key.pem', 'utf-8');

        for (const key in update.$set) {
            if (
                Object.prototype.hasOwnProperty.call(update.$set, key) &&
                key !== 'userId' && // Exclude userId
                key !== '_id' &&
                key !== '__v'// Exclude Id (adjust to match your actual field names)/
            ) {
                const encryptedData = Buffer.from(update.$set[key], 'base64');
                const result = decrypt.decryptWithPrivateKey(privateKey, encryptedData)
                doc[key] = result.toString('utf-8');
            }
        }
    }
});



userProfileSchema.post('findOne', async function (doc) {

    if (doc) {
        const privateKey = fs.readFileSync('private-key.pem', 'utf-8');

        for (const key in doc._doc) {
            if (
                Object.prototype.hasOwnProperty.call(doc._doc, key) &&
                key !== 'userId' && // Exclude userId
                key !== '_id' &&
                key !== '__v'// Exclude Id (adjust to match your actual field names)
            ) {

                const encryptedData = Buffer.from(doc._doc[key], 'base64');
                const result = decrypt.decryptWithPrivateKey(privateKey, encryptedData);
                doc[key] = result.toString('utf-8');
            }
        }
    }
});






const UserProfile = mongoose.model('Profile', userProfileSchema);

export default UserProfile