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
const AuthService_1 = __importDefault(require("../../services/AuthService"));
const apiResponse_1 = __importDefault(require("../../utils/apiResponse"));
const validation_1 = __importDefault(require("../../utils/validation"));
const password_1 = require("../../utils/password");
const authController = {
    // Asynchronous function for user registration
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Destructure email, and password from the request body
                const { email, password } = req.body;
                // Validate the request body using the basicValidation method
                yield validation_1.default.basicValidation(req.body);
                // Check if the provided username and email are already taken
                yield AuthService_1.default.emailNotAlreadyTaken(email);
                // Create a new user with the provided username, email, and password
                const newUser = yield AuthService_1.default.registerUserWithPassword({ email, password });
                //create token
                const token = (0, password_1.issueJWT)(newUser);
                // Manipulate or sanitize the user data as needed
                // Set the Authorization header with the JWT token
                res.setHeader('Authorization', `Bearer ${token}`);
                // Set a custom header for the session ID
                res.setHeader('Secret-Session-Id', req.session.id);
                const sanitizedUser = {
                    email: newUser.email,
                    role: newUser.role,
                };
                // Use sanitizedUser as needed (e.g., return it as part of the response)
                return res.status(200).json(new apiResponse_1.default(200, 'User Registeration', 'User registered successfully', sanitizedUser));
            }
            catch (error) {
                // If an error occurs, pass it to the next middleware for handling
                next(error);
            }
        });
    },
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Destructure username, email, and password from the request body
                const { email, password } = req.body;
                // Validate the request body using the basicValidation method
                yield validation_1.default.basicValidation(req.body);
                // Validate the request and see first if the user exist
                const user = yield AuthService_1.default.verifyEmail(email);
                yield AuthService_1.default.verifyPassword(user, password);
                // Manipulate or sanitize the user data as needed
                const token = (0, password_1.issueJWT)(user);
                // Set the Authorization header with the JWT token
                res.setHeader('authorization', JSON.stringify(token));
                // Set a custom header for the session ID
                res.setHeader('session_id', req.session.id);
                const sanitizedUser = {
                    email: user.email,
                    role: user.role,
                };
                return res.status(200).json(new apiResponse_1.default(200, '', 'User login successfully', sanitizedUser));
            }
            catch (error) {
                next(error);
            }
        });
    },
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Destructure username, email, and password from the request body
            const { email } = req.body;
            // Validate the request body using the basicValidation method
            yield validation_1.default.basicValidation(req.body);
            // Perform forgot password
            const result = yield AuthService_1.default.forgotPassword(email);
            return res.status(200).json(new apiResponse_1.default(200, '', `An email has been sent to ${email} with instructions for resetting your password.`, result));
        });
    },
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req);
        });
    },
};
exports.default = authController;
