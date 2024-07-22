"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailable_1 = __importDefault(require("../config/mailable"));
const mailService = {
    // Constructor not needed here
    // Method to send an email
    sendMail(mailOptions) {
        // return new Promise((resolve, reject) => {
        //     mailConfig.getTransporter().sendMail(mailOptions, (error, info) => {
        //         if (error) {
        //             reject(error);
        //         } else {
        //             resolve(info);
        //         }
        //     });
        // });
        console.log(mailable_1.default.getCompanyLogo());
        console.log(mailable_1.default.getCompanyName());
        console.log(mailable_1.default.getFromAddress());
    }
};
exports.default = {
    mailService
};
