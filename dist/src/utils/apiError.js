"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode, errorLog = "", message = "Something went wrong", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;
        this.errorLog = errorLog;
        if (stack) {
            this.stack = stack;
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;
