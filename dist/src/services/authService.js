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
// Assuming the correct path to the User model
const apiError_1 = __importDefault(require("../utils/apiError"));
const user_1 = require("../model/user");
const password_1 = require("../utils/password");
const authService = {
    registerUserWithPassword(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            // Generate salt and hash for password
            const { salt, hash } = (0, password_1.generatePassword)(password);
            return yield user_1.User.register({ email: email, hash: hash, salt: salt });
        });
    },
    emailNotAlreadyTaken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOneByEmail(email);
            if (user) {
                throw new apiError_1.default({ success: false, statusCode: 404, title: "The sign up was not successful.", message: "The entered email already exists" });
            }
            return true;
        });
    },
    verifyEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOneByEmail(email);
            if (!user) {
                throw new apiError_1.default({ success: false, statusCode: 404, title: "The login was not successful.", message: "The email address & password combination you have entered is incorrect. Please try again or click the forgotten password link below to reset your password." });
            }
            return user;
        });
    },
    verifyEmailAndPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.findOneByEmail(email);
        });
    },
    verifyPassword(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, password_1.verifyPassword)(password, user.hash, user.salt)) {
                throw new apiError_1.default({ success: false, statusCode: 404, title: "The login was not successful.", message: "The email address & password combination you have entered is incorrect. Please try again or click the forgotten password link below to reset your password." });
            }
        });
    }
    // async ifEmailAndUsernameIsTaken(email: string): Promise<boolean> {
    //     try {
    //         // Attempt to find a user with the provided email
    //         const user = await User.fi
    //         // If a user is found, reject the promise with a custom error message
    //         if (user) {
    //             throw new ApiError(404, 'Validation Error', "User with this email already exists");
    //         }
    //         // If no user is found, fulfill the promise with a value of true
    //         return true;
    //     } catch (error: any) {
    //         throw new ApiError(404, error.message ?? 'An error occurred');
    //     }
    // },
    ,
    findOrFailUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // // Attempt to find a user with the provided email
                // const user = await User.findOne({ email });
                // if (!user) {
                //     throw new ApiError(404, 'ValidationError', '!!No user found with the provided credentials.');
                // }
                return null;
            }
            catch (error) {
                // throw new ApiError(404, error.message);
            }
        });
    },
    // async performLogin(user: any, password: string) {
    //     try {
    //         if (!verifyPassword(password, user.hash, user.salt)) {
    //             // throw new ApiError(404, 'CredentialsError', 'Incorrect password provided.');
    //         }
    //         // Issue JWT token for user authentication
    //         const token = utils.issueJWT(user);
    //         // Return a sanitized user object without sensitive information
    //         // const sanitizedUser: SanitizedUser = {
    //         //     email: user.email,
    //         //     role: user.role,
    //         //     token: token,
    //         // };
    //         // return sanitizedUser;
    //     } catch (error: any) {
    //         throw new ApiError({ success: false, statusCode: 404, title: "Authorization failed", message: `Something went wrong, User Authorization failed` });
    //         // throw new ApiError(404, error.message);
    //     }
    // },
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Assuming sendMail returns a Promise
                // await mailService.sendMail({ email: email });
            }
            catch (error) {
                // throw new ApiError(404, error.message);
            }
        });
    },
    getUserIDFromJWT(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user && req.user._id) {
                const _id = req.user._id;
                return _id.toString();
            }
            throw new apiError_1.default({ success: false, statusCode: 404, title: "Authorization failed", message: `Something went wrong, User Authorization failed` });
        });
    },
};
exports.default = authService;
