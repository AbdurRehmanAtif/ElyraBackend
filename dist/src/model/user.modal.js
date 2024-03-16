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
// Define the user schema
const userSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
    },
    username: {
        type: String,
        required: false,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    watchHistory: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    salt: {
        type: String,
        required: [true, "Password is required"]
    },
    hash: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
});
// Define the static method on the schema
userSchema.statics.findByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Attempt to find a user with the provided email
            const user = yield this.findOne({ email: email });
            // Handle the case where no user is found
            if (!user) {
                return null;
                // Handle the error or return an appropriate response
            }
            return user;
        }
        catch (error) {
            return null;
        }
    });
};
// Create the User model
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
