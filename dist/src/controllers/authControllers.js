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
// userController.js
const authService_1 = __importDefault(require("../services/authService"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const validation_1 = __importDefault(require("../utils/validation"));
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
                yield authService_1.default.ifEmailAndUsernameIsTaken(email);
                // Create a new user with the provided username, email, and password
                const user = yield authService_1.default.createUserWithEmail({ email, password });
                // // Respond with a success status and the registered user's information
                return res.status(200).json(new apiResponse_1.default(200, 'User registered successfully', user));
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
                const user = yield authService_1.default.findOrFailUser(email);
                // Now check if the password is correct or not
                const result = yield authService_1.default.performLogin(user, password);
                return res.status(200).json(new apiResponse_1.default(200, 'User login successfully', result));
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
            const result = yield authService_1.default.forgotPassword(email);
            return res.status(200).json(new apiResponse_1.default(200, `An email has been sent to ${email} with instructions for resetting your password.`, result));
        });
    },
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req);
        });
    },
};
exports.default = authController;
