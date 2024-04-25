import User from '../model/user.modal';
import mongoose from 'mongoose';
// Assuming the correct path to the User model
import * as utils from '../../lib/passwordUtils'; // Assuming the correct path to passwordUtils module
import ApiError from '../utils/apiError';
import { verifyPassword } from '../../lib/passwordUtils';
import ApiResponse from '../utils/apiResponse';
import * as mailService from './mailService';

interface SanitizedUser {
    email: string;
    role: string;
    isAdmin: boolean;
    token: any;
}

const authService = {

    async createUserWithEmail({ email, password }: { email: string, password: string }): Promise<SanitizedUser> {
        try {
            // Generate salt and hash for password
            const { salt, hash } = utils.genPassword(password);
            // Create a new user instance with hashed password
            const newUser = new User({
                email: email,
                hash: hash,
                salt: salt,
                role: 'USER'
            });

            // Save the user to the database
            const user = await newUser.save() as any;

            if (user) {
                // Issue JWT token for user authentication
                const token = utils.issueJWT(user);
                // Return a sanitized user object without sensitive information
                const sanitizedUser: SanitizedUser = {
                    email: user.email,
                    role: user.role,
                    isAdmin: user.admin,
                    token: token,
                };

                return sanitizedUser;
            }
            throw new ApiError(404, 'Server Response Error', "Unable to create a new user");
        } catch (error: any) {
            throw new ApiError(404, 'Server Response Error', error.message);
        }
    },

    async ifEmailAndUsernameIsTaken(email: string): Promise<boolean> {
        try {
            // Attempt to find a user with the provided email
            const user = await User.findOne({ email });

            // If a user is found, reject the promise with a custom error message
            if (user) {
                throw new ApiError(404, 'Validation Error', "User with this email already exists");
            }

            // If no user is found, fulfill the promise with a value of true
            return true;
        } catch (error: any) {
            throw new ApiError(404, error.message ?? 'An error occurred');

        }
    },

    async findOrFailUser(email: string) {
        try {
            // Attempt to find a user with the provided email
            const user = await User.findOne({ email });

            if (!user) {
                throw new ApiError(404, 'ValidationError', '!!No user found with the provided credentials.');
            }

            return user;

        } catch (error: any) {
            throw new ApiError(404, error.message);
        }
    },

    async performLogin(user: any, password: string): Promise<SanitizedUser> {
        try {
            if (!verifyPassword(password, user.hash, user.salt)) {
                throw new ApiError(404, 'CredentialsError', 'Incorrect password provided.');
            }

            // Issue JWT token for user authentication
            const token = utils.issueJWT(user);
            // Return a sanitized user object without sensitive information
            const sanitizedUser: SanitizedUser = {


                email: user.email,
                role: user.role,
                isAdmin: user.admin,
                token: token,
            };

            return sanitizedUser;

        } catch (error: any) {
            throw new ApiError(404, error.message);
        }
    },

    async forgotPassword(email: string): Promise<void> {
        try {
            // Assuming sendMail returns a Promise
            // await mailService.sendMail({ email: email });
        } catch (error: any) {
            throw new ApiError(404, error.message);
        }
    },

    async getUserIDFromJWT(req: any): Promise<string> {
        if (req.user && req.user._id) {
            const _id = req.user._id;
            return _id.toString();
        }

        throw new ApiError(404, 'Something went wrong, User Authorization failed');
    }
};

export default authService;
