"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(err) {
        super(err.message || err.title); // Use the message or title from the error response
        this.name = "ApiError"; // Set the name property to "ApiError" (optional)
        // Assign properties from the error response
        this.statusCode = err.statusCode;
        this.success = err.success;
        this.title = err.title;
        this.errorLog = err.errorLog;
        this.stack = err.stack;
        this.errorLog = err.title;
        // Capture stack trace if available
        if (err.stack) {
            this.stack = err.stack;
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;
