const ApiError = require("./apiError");

const Validation = {

    // Asynchronous method for basic validation of parameters
    async basicValidation(params) {
        try {
            // Check if params is truthy (not null or undefined)
            if (params) {
                // Convert the params object to an array of [key, value] pairs
                const bodyArray = Object.entries(params);
                // Iterate through the array to check if any value is empty
                for (const [key, value] of bodyArray) {
                    // If a value is empty, reject the promise with a validation error
                    if (!value || !key) {
                        return Promise.reject(new ApiError(200, 'ValidationError', `Validation failed: ${key} cannot be empty.`));
                    }
                }
            }
        } catch (error) {
            // If an error occurs during validation, handle it (Note: 'next' is not defined here)
            next(error);
        }
    }
}
module.exports = Validation;