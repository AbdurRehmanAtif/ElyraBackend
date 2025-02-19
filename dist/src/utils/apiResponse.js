"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    constructor(statusCode, title, message = "success", data) {
        this.statusCode = statusCode;
        this.title = title;
        this.success = true;
        this.message = message;
        this.data = data;
    }
}
exports.default = ApiResponse;
