// userController.js
const authService = require('../services/authService');
const ApiResponse = require('../utils/apiResponse');
const Validation = require('../utils/validation')


const AuthController = {

    // Asynchronous function for user registration
    async register(req, res, next) {
        try {
            // Destructure username, email, and password from the request body
            const { username, email, password } = req.body;
            // Validate the request body using the basicValidation method
            await Validation.basicValidation(req.body);
            // Check if the provided username and email are already taken
            await authService.ifEmailAndUsernameIsTaken(username, email);
            // Create a new user with the provided username, email, and password
            const user = await authService.createUserWithEmail({ username, email, password });

            // // Respond with a success status and the registered user's information
            return res.status(200).json(new ApiResponse("200", 'User registered successfully', user));
        } catch (error) {
            // If an error occurs, pass it to the next middleware for handling
            next(error);
        }
    },

    async login(req, res, next) {
        try {
            // Destructure username, email, and password from the request body
            const { username, password } = req.body;
            // Validate the request body using the basicValidation method
            await Validation.basicValidation(req.body);
            // Validate the request and see first if the user exist
            const user = await authService.findOrFailUser(username);
            // Now check if the password is correct or not
            const result = await authService.performLogin(user, password);
            return res.status(200).json(new ApiResponse("200", 'User login successfully', result));
        } catch (error) {
            next(error)
        }
    },


};

module.exports = AuthController;
