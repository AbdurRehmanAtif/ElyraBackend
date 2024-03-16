"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userProfile_js_1 = __importDefault(require("../model/userProfile.js"));
const address_js_1 = __importDefault(require("../model/address.js"));
const decrypt_js_1 = __importDefault(require("../../lib/cryptography/decrypt.js"));
const fs_1 = __importDefault(require("fs"));
const apiError_js_1 = __importDefault(require("../utils/apiError.js"));
const mongoose_1 = __importDefault(require("mongoose"));
const { Types: { ObjectId } } = mongoose_1.default;
const userService = {
    /**
 * Saves or updates a user profile in the database.
 *
 * @param {Object} req - The request object, containing the user profile data in the request body.
 * @param {string} _id - The user ID used to identify the user profile.
 * @returns {Promise<Object>} A promise that resolves to the saved or updated user profile.
 * @throws {ApiError} If an error occurs during the database query or any other asynchronous operation.
 */
    saveUserProfile(req, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extract user profile data from the request body
                let requestData = req.body;
                // Add userID to the user profile data
                const userId = _id;
                requestData = Object.assign({ userId }, requestData);
                // Find and update or create a user profile in the database
                const results = yield userProfile_js_1.default.findOneAndUpdate({ userId: userId }, { $set: requestData }, { upsert: true, new: true, setDefaultsOnInsert: true }).select('-userId');
                // Return the saved or updated user profile
                return results;
            }
            catch (error) {
                // If an error occurs during the database query or any other asynchronous operation,
                // reject the promise with the caught error for consistent error handling
                return Promise.reject(new apiError_js_1.default(404, error.message));
            }
        });
    },
    userProfile(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find and update or create a user profile in the database
                const results = yield userProfile_js_1.default.findOne({ userId: _id }).select('-userId');
                // Return the saved or updated user profile
                return results;
            }
            catch (error) {
                // If an error occurs during the database query or any other asynchronous operation,
                // reject the promise with the caught error for consistent error handling
                return Promise.reject(new apiError_js_1.default(404, error.message));
            }
        });
    },
    saveAddress(req, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extract user profile data from the request body
                let requestData = req.body;
                // Add userID to the user profile data
                const userId = _id;
                requestData = Object.assign({ userId }, requestData);
                // Find and update or create a user profile in the database
                const results = yield address_js_1.default.findOneAndUpdate({ userId: userId }, { $set: requestData }, { upsert: true, new: true, setDefaultsOnInsert: true }).select('-userId');
                // Return the saved or updated user profile
                return results;
            }
            catch (error) {
                // If an error occurs during the database query or any other asynchronous operation,
                // reject the promise with the caught error for consistent error handling
                return Promise.reject(new apiError_js_1.default(404, error.message));
            }
        });
    },
    profileDetails(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield userProfile_js_1.default.aggregate([
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
                            "address._id": 0, // Exclude _id from the address field
                            userId: 0, // Exclude userId from the main document
                            _id: 0 // Exclude _id from the main document
                            // Add other fields you want to include in the result
                        }
                    }
                ]);
                return result;
            }
            catch (error) {
                // If an error occurs during the database query or any other asynchronous operation,
                // reject the promise with the caught error for consistent error handling
                return Promise.reject(new apiError_js_1.default(404, error.message));
            }
        });
    },
    DecryptProfileDetails(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (data.length > 0) {
                    const parsedArray = [];
                    let addr = [];
                    if (data[0].address.length > 0) {
                        addr = data[0].address[0];
                    }
                    const privateKey = fs_1.default.readFileSync('private-key.pem', 'utf-8');
                    for (const key in data[0]) {
                        if (key !== 'address' && key !== '__v') {
                            const value = data[0][key];
                            const arg = {};
                            arg[key] = decryptValue(value);
                            parsedArray.push(arg);
                        }
                    }
                    for (const key in addr) {
                        if (key != '__v') {
                            const value = addr[key];
                            const arg = {};
                            arg[key] = decryptValue(value);
                            parsedArray.push(arg);
                        }
                    }
                    function decryptValue(value) {
                        const encryptedData = Buffer.from(value, 'base64');
                        const result = decrypt_js_1.default.decryptWithPrivateKey(privateKey, encryptedData);
                        return result.toString('utf-8');
                    }
                    return parsedArray;
                }
                return [];
            }
            catch (error) {
                // If an error occurs during the database query or any other asynchronous operation,
                // reject the promise with the caught error for consistent error handling
                return Promise.reject(new apiError_js_1.default(404, error.message));
            }
        });
    }
};
exports.default = userService;
