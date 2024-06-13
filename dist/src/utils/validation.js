"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("./apiError")); // Assuming the correct import path
const Validation = {
    // Asynchronous method for basic validation of parameters
    basicValidation(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if params is truthy (not null or undefined)
                if (params) {
                    // Convert the params object to an array of [key, value] pairs
                    const bodyArray = Object.entries(params);
                    // Iterate through the array to check if any value is empty
                    for (const [key, value] of bodyArray) {
                        // If a value is empty, reject the promise with a validation error
                        if (!value || !key) {
                            throw new apiError_1.default({ success: false, statusCode: 404, title: "Validation Error", message: `Validation failed: ${key} cannot be empty.` });
                        }
                    }
                }
            }
            catch (error) {
                // If an error occurs during validation, throw the error
                throw error;
            }
        });
    }
};
exports.default = Validation;
