// userController.js
import authService from '../services/authService';
import apiResponse from '../utils/apiResponse';
import validation from '../utils/validation';
import { Request, Response, NextFunction } from 'express';

const authController = {

    // Asynchronous function for user registration
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            // Destructure email, and password from the request body
            const { email, password } = req.body;
            // Validate the request body using the basicValidation method
            await validation.basicValidation(req.body);
            // Check if the provided username and email are already taken
            await authService.ifEmailAndUsernameIsTaken(email);
            // Create a new user with the provided username, email, and password
            const user = await authService.createUserWithEmail({email, password });

            // // Respond with a success status and the registered user's information
            return res.status(200).json(new apiResponse(200, 'User registered successfully', user));
        } catch (error) {
            // If an error occurs, pass it to the next middleware for handling
            next(error);
        }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            // Destructure username, email, and password from the request body
            const { email, password } = req.body;
            // Validate the request body using the basicValidation method
            await validation.basicValidation(req.body);
            // Validate the request and see first if the user exist
            const user = await authService.findOrFailUser(email);
            // Now check if the password is correct or not
            const result = await authService.performLogin(user, password);
            return res.status(200).json(new apiResponse(200, 'User login successfully', result));
        } catch (error) {
            next(error)
        }
    },

    async forgotPassword(req: Request, res: Response, next: NextFunction) {

        // Destructure username, email, and password from the request body
        const { email } = req.body;
        // Validate the request body using the basicValidation method
        await validation.basicValidation(req.body);
        // Perform forgot password
        const result = await authService.forgotPassword(email);
        return res.status(200).json(new apiResponse(200, `An email has been sent to ${email} with instructions for resetting your password.`, result));

    },

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        console.log(req)

    },

};

export default authController