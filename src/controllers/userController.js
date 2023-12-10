const ApiResponse = require('../utils/apiResponse');
const Validation = require('../utils/validation')
const AuthService = require('../services/authService');
const UserService = require('../services/userService');

const UserController = {



    async saveProfile(req, res, next) {
        try {
            //basic validation
            await Validation.basicValidation(req.body);
            // Loop through the keys in req.body
            const _id = await AuthService.getUserIDFromJWT(req);
            // Save the results in profile
            const result = await UserService.saveUserProfile(req, _id)
            // Respond with a success status and the registered user's information
            return res.status(200).json(new ApiResponse("200", 'Profile information saved successfully', result));
        } catch (err) {
            next(err)
        }
    },

    async Profile(req, res, next) {
        try {

            // Loop through the keys in req.body
            const _id = await AuthService.getUserIDFromJWT(req);
            // Save the results in profile
            const result = await UserService.userProfile(_id)

            // // Respond with a success status and the registered user's information
            return res.status(200).json(new ApiResponse("200", 'Profile information retrieved successfully', result));
        } catch (err) {
            next(err)
        }
    },



    async saveAddress(req, res, next) {
        try {
            //basic validation
            await Validation.basicValidation(req.body);
            // Loop through the keys in req.body
            const _id = await AuthService.getUserIDFromJWT(req);
            // Save the results in profile
            const result = await UserService.saveAddress(req, _id)
            // Respond with a success status and the registered user's information
            return res.status(200).json(new ApiResponse("200", 'Address information saved successfully', result));
        } catch (err) {
            next(err)
        }
    },

    async getProfileDetails(req, res, next) {
        try {
            // Loop through the keys in req.body
            const _id = await AuthService.getUserIDFromJWT(req);
            // Save the results in profile
            let result = await UserService.profileDetails(_id)
            result = await UserService.DecryptProfileDetails(result)
            // Respond with a success status and the registered user's information
            return res.status(200).json(new ApiResponse("200", '', result));
        } catch (err) {
            next(err)
        }
    }

}

module.exports = UserController;
