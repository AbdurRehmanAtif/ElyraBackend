"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const user_modal_1 = __importDefault(require("../model/user.modal"));
// Assuming the correct path to the User model
const utils = __importStar(require("../../lib/passwordUtils")); // Assuming the correct path to passwordUtils module
const apiError_1 = __importDefault(require("../utils/apiError"));
const passwordUtils_1 = require("../../lib/passwordUtils");
const authService = {
    createUserWithEmail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            try {
                // Generate salt and hash for password
                const { salt, hash } = utils.genPassword(password);
                // Create a new user instance with hashed password
                const newUser = new user_modal_1.default({
                    email: email,
                    hash: hash,
                    salt: salt,
                    role: 'USER'
                });
                // Save the user to the database
                const user = yield newUser.save();
                if (user) {
                    // Issue JWT token for user authentication
                    const token = utils.issueJWT(user);
                    // Return a sanitized user object without sensitive information
                    const sanitizedUser = {
                        email: user.email,
                        role: user.role,
                        isAdmin: user.admin,
                        token: token,
                    };
                    return sanitizedUser;
                }
                throw new apiError_1.default(404, 'Server Response Error', "Unable to create a new user");
            }
            catch (error) {
                throw new apiError_1.default(404, 'Server Response Error', error.message);
            }
        });
    },
    ifEmailAndUsernameIsTaken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // Attempt to find a user with the provided email
                const user = yield user_modal_1.default.findOne({ email });
                // If a user is found, reject the promise with a custom error message
                if (user) {
                    throw new apiError_1.default(404, 'Validation Error', "User with this email already exists");
                }
                // If no user is found, fulfill the promise with a value of true
                return true;
            }
            catch (error) {
                throw new apiError_1.default(404, (_a = error.message) !== null && _a !== void 0 ? _a : 'An error occurred');
            }
        });
    },
    findOrFailUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Attempt to find a user with the provided email
                const user = yield user_modal_1.default.findOne({ email });
                if (!user) {
                    throw new apiError_1.default(404, 'ValidationError', '!!No user found with the provided credentials.');
                }
                return user;
            }
            catch (error) {
                throw new apiError_1.default(404, error.message);
            }
        });
    },
    performLogin(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, passwordUtils_1.verifyPassword)(password, user.hash, user.salt)) {
                    throw new apiError_1.default(404, 'CredentialsError', 'Incorrect password provided.');
                }
                // Issue JWT token for user authentication
                const token = utils.issueJWT(user);
                // Return a sanitized user object without sensitive information
                const sanitizedUser = {
                    email: user.email,
                    role: user.role,
                    isAdmin: user.admin,
                    token: token,
                };
                return sanitizedUser;
            }
            catch (error) {
                throw new apiError_1.default(404, error.message);
            }
        });
    },
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Assuming sendMail returns a Promise
                // await mailService.sendMail({ email: email });
            }
            catch (error) {
                throw new apiError_1.default(404, error.message);
            }
        });
    },
    getUserIDFromJWT(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user && req.user._id) {
                const _id = req.user._id;
                return _id.toString();
            }
            throw new apiError_1.default(404, 'Something went wrong, User Authorization failed');
        });
    }
};
exports.default = authService;
