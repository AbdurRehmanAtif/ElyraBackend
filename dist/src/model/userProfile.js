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
const mongoose_1 = __importDefault(require("mongoose"));
const encrypt = require('../../lib/cryptography/encrypt.js');
const decrypt = require('../../lib/cryptography/decrypt.js');
const fs_1 = __importDefault(require("fs"));
const userProfileSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: String },
    about: { type: String },
    phone: { type: String },
    gender: { type: String },
    avatar: { type: String },
    coverImage: { type: String },
});
userProfileSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // 'this' refers to the query being executed
        const update = this.getUpdate();
        // Check if there is an update and it includes $set
        if (update && ('$set' in update)) {
            const publicKey = fs_1.default.readFileSync('public-key.pem', 'utf-8');
            // Iterate over the keys in $set
            for (const key in update.$set) {
                if (Object.prototype.hasOwnProperty.call(update.$set, key) &&
                    key !== 'userId' && // Exclude userId
                    key !== '_id' &&
                    key !== '__v' // Exclude Id (adjust to match your actual field names)/
                ) {
                    // Apply encryption logic to each field
                    const encryptedData = encrypt.encryptWithPublicKey(publicKey, update.$set[key]);
                    update.$set[key] = encryptedData.toString('base64');
                }
            }
        }
        next();
    });
});
userProfileSchema.post('findOneAndUpdate', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if ((update === null || update === void 0 ? void 0 : update.$set) && doc) {
            const privateKey = fs_1.default.readFileSync('private-key.pem', 'utf-8');
            for (const key in update.$set) {
                if (Object.prototype.hasOwnProperty.call(update.$set, key) &&
                    key !== 'userId' && // Exclude userId
                    key !== '_id' &&
                    key !== '__v' // Exclude Id (adjust to match your actual field names)/
                ) {
                    const encryptedData = Buffer.from(update.$set[key], 'base64');
                    const result = decrypt.decryptWithPrivateKey(privateKey, encryptedData);
                    doc[key] = result.toString('utf-8');
                }
            }
        }
    });
});
userProfileSchema.post('findOne', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            const privateKey = fs_1.default.readFileSync('private-key.pem', 'utf-8');
            for (const key in doc._doc) {
                if (Object.prototype.hasOwnProperty.call(doc._doc, key) &&
                    key !== 'userId' && // Exclude userId
                    key !== '_id' &&
                    key !== '__v' // Exclude Id (adjust to match your actual field names)
                ) {
                    const encryptedData = Buffer.from(doc._doc[key], 'base64');
                    const result = decrypt.decryptWithPrivateKey(privateKey, encryptedData);
                    doc[key] = result.toString('utf-8');
                }
            }
        }
    });
});
const UserProfile = mongoose_1.default.model('Profile', userProfileSchema);
exports.default = UserProfile;
