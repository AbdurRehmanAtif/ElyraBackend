import ApiResponse from '../utils/apiResponse.js';
import Validation from '../utils/validation.js';
import authService from '../services/authService.js';
import userService from '../services/userService.js';
import { Request, Response, NextFunction } from 'express';


const UserController = {

    async saveProfile(req: Request, res: Response, next: NextFunction) {
        try {
            
            //basic validation
            await Validation.basicValidation(req.body);
            // Loop through the keys in req.body
            const _id = await authService.getUserIDFromJWT(req);
            // Save the results in profile
            const result = await userService.saveUserProfile(req, _id)
            // Respond with a success status and the registered user's information
            return res.status(200).json(new ApiResponse(200, 'Profile information saved successfully', result));
        } catch (err) {
            next(err)
        }
    },

    async Profile(req: Request, res: Response, next: NextFunction) {
        try {

            // Loop through the keys in req.body
            const _id = await authService.getUserIDFromJWT(req);
            // Save the results in profile
            const result = await userService.userProfile(_id)

            // // Respond with a success status and the registered user's information
            return res.status(200).json(new ApiResponse(200, 'Profile information retrieved successfully', result));
        } catch (err) {
            next(err)
        }
    },



    async saveAddress(req: Request, res: Response, next: NextFunction) {
        try {
            //basic validation
            await Validation.basicValidation(req.body);
            // Loop through the keys in req.body
            const _id = await authService.getUserIDFromJWT(req);
            // Save the results in profile
            const result = await userService.saveAddress(req, _id)
            // Respond with a success status and the registered user's information
            return res.status(200).json(new ApiResponse(200, 'Address information saved successfully', result));
        } catch (err) {
            next(err)
        }
    },

    async getProfileDetails(req: Request, res: Response, next: NextFunction) {
        try {
            // Loop through the keys in req.body
            const _id = await authService.getUserIDFromJWT(req);
            // Save the results in profile
            let result = await userService.profileDetails(_id)
            result = await userService.DecryptProfileDetails(result)
            // Respond with a success status and the registered user's information
            return res.status(200).json(new ApiResponse(200, '', result));
        } catch (err) {
            next(err)
        }
    }

}

export default UserController