const { User } = require('../model/user.modal')
const utils = require('../../lib/passwordUtils');
const ApiError = require('../utils/apiError');
const { verifyPassword } = require('../../lib/passwordUtils');

const authService = {

    async createUserWithEmail({ username, email, password }) {
        try {
            // Generate salt and hash for password
            const { salt, hash } = utils.genPassword(password);

            // Create a new user instance with hashed password
            const newUser = new User({
                email: email,
                username: username,
                hash: hash,
                salt: salt,
                admin: false
            });

            // Save the user to the database
            const user = await newUser.save();

            if (user) {
                // Issue JWT token for user authentication
                const token = utils.issueJWT(user);
                // Return a sanitized user object without sensitive information
                const sanitizedUser = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.admin,
                    token: token,
                };

                return sanitizedUser;
            }
            return Promise.reject(new ApiError(404, 'ServerResponseError', "Unable to create a new user"))
        } catch (error) {
            return Promise.reject(new ApiError(404, 'ServerResponseError', error.message))
        }
    },

    async ifEmailAndUsernameIsTaken(username, email) {
        try {
            // Attempt to find a user with the provided email
            const user = await User.findOne({
                $or: [{ username }, { email }]
            });
            // If a user is found, reject the promise with a custom error message
            if (user) {
                return Promise.reject(new ApiError(404, 'ValidationError', "User with email or same username already exist"))
            }
            // If no user is found, fulfill the promise with a value of true
            return true;
        } catch (error) {
            // If an error occurs during the database query or any other asynchronous operation,
            // reject the promise with the caught error for consistent error handling
            return Promise.reject(new ApiError(404, error.message))
        }
    },

    async findOrFailUser(identifier) {
        try {
            // Attempt to find a user with the provided id
            const user = await User.findOne({
                $or: [
                    { email: identifier },
                    { username: identifier }
                ]
            });
            if (!user) {
                return Promise.reject(new ApiError(401, 'ValidationError', 'No user found with the provided credentials.'));
            }

            return user;

        } catch (error) {
            // If an error occurs during the database query or any other asynchronous operation,
            // reject the promise with the caught error for consistent error handling
            return Promise.reject(new ApiError(404, error.message))
        }

    },
    async performLogin(user, password) {

        try {

            if (!verifyPassword(password, user.hash, user.salt)) {
                return Promise.reject(new ApiError(404, 'CredentialsError', 'Incorrect password provided.'));
            }

            // Issue JWT token for user authentication
            const token = utils.issueJWT(user);
            // Return a sanitized user object without sensitive information
            const sanitizedUser = {
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.admin,
                token: token,
            };
            return sanitizedUser;

        } catch (error) {
            // If an error occurs during the database query or any other asynchronous operation,
            // reject the promise with the caught error for consistent error handling
            return Promise.reject(new ApiError(404, error.message))
        }
    },

    async getUserIDFromJWT(req) {

        if (req.user && req.user._id) {
            const _id = req.user._id
            return _id.toString();;
        }

        return Promise.reject(new ApiError(404, 'Something went wrong, User Authorization failed'))
    }
};
module.exports = authService;
