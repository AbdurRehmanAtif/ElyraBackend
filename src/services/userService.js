const { UserProfile } = require('../model/userProfile');
const { UserAddress } = require('../model/address');
const { decryptWithPrivateKey } = require('../../lib/cryptography/decrypt')
const decrypt = require('../../lib/cryptography/decrypt')
const fs = require('fs');
const ApiError = require('../utils/apiError');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const userService = {

    /**
 * Saves or updates a user profile in the database.
 * 
 * @param {Object} req - The request object, containing the user profile data in the request body.
 * @param {string} _id - The user ID used to identify the user profile.
 * @returns {Promise<Object>} A promise that resolves to the saved or updated user profile.
 * @throws {ApiError} If an error occurs during the database query or any other asynchronous operation.
 */
    async saveUserProfile(req, _id) {
        try {
            // Extract user profile data from the request body
            let requestData = req.body;
            // Add userID to the user profile data
            const userId = _id;
            requestData = {
                userId,
                ...requestData
            };
            // Find and update or create a user profile in the database
            const results = await UserProfile.findOneAndUpdate(
                { userId: userId },
                { $set: requestData },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            ).select('-userId');
            // Return the saved or updated user profile
            return results;
        } catch (error) {
            // If an error occurs during the database query or any other asynchronous operation,
            // reject the promise with the caught error for consistent error handling
            return Promise.reject(new ApiError(404, error.message));
        }
    },

    async userProfile(_id) {
        try {
            // Find and update or create a user profile in the database
            const results = await UserProfile.findOne(
                { userId: _id }
            ).select('-userId');
            // Return the saved or updated user profile
            
            return results;

        } catch (error) {
            // If an error occurs during the database query or any other asynchronous operation,
            // reject the promise with the caught error for consistent error handling
            return Promise.reject(new ApiError(404, error.message));
        }
    },

    async saveAddress(req, _id) {
        try {
            // Extract user profile data from the request body
            let requestData = req.body;
            // Add userID to the user profile data
            const userId = _id;
            requestData = {
                userId,
                ...requestData
            };
            // Find and update or create a user profile in the database
            const results = await UserAddress.findOneAndUpdate(
                { userId: userId },
                { $set: requestData },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            ).select('-userId');
            // Return the saved or updated user profile
            return results;


        } catch (error) {
            // If an error occurs during the database query or any other asynchronous operation,
            // reject the promise with the caught error for consistent error handling
            return Promise.reject(new ApiError(404, error.message));
        }
    },

    async profileDetails(_id) {
        try {

            const result = await UserProfile.aggregate([
                {
                    $match: { userId: new ObjectId(_id) }
                },
                {
                    $lookup: {
                        from: "addresses", // The name of the second collection
                        localField: 'userId', // The field from the first collection
                        foreignField: 'userId', // The field from the second collection
                        as: 'address'
                    }
                },
                {
                    $project: {
                        "address.userId": 0, // Exclude userId from the address field
                        "address._id": 0,   // Exclude _id from the address field
                        userId: 0,          // Exclude userId from the main document
                        _id: 0              // Exclude _id from the main document
                        // Add other fields you want to include in the result
                    }
                }
            ]);

            return result;

        } catch (error) {
            // If an error occurs during the database query or any other asynchronous operation,
            // reject the promise with the caught error for consistent error handling
            return Promise.reject(new ApiError(404, error.message));
        }
    },

    async DecryptProfileDetails(data) {

        try {
            if (data.length > 0) {
                const parsedArray = [];
                let addr = [];
                if (data[0].address.length > 0) {
                    addr = data[0].address[0];
                }

                const privateKey = fs.readFileSync('private-key.pem', 'utf-8');

                for (const key in data[0]) {
                    if (key !== 'address' && key !== '__v') {
                        const value = data[0][key];
                        const arg = {}
                        arg[key] = decryptValue(value)
                        parsedArray.push(arg);
                    }
                }

                for (const key in addr) {
                    if (key != '__v') {
                        const value = addr[key];
                        const arg = {}
                        arg[key] = decryptValue(value)
                        parsedArray.push(arg);
                    }
                }

                function decryptValue(value) {
                    const encryptedData = Buffer.from(value, 'base64');
                    const result = decrypt.decryptWithPrivateKey(privateKey, encryptedData)
                    return result.toString('utf-8');
                }

                return parsedArray;
            }
            return []
        } catch (error) {
            // If an error occurs during the database query or any other asynchronous operation,
            // reject the promise with the caught error for consistent error handling
            return Promise.reject(new ApiError(404, error.message));
        }
    }
}


module.exports = userService;