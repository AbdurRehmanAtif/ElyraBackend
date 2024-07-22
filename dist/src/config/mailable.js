"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailConfig {
    constructor() {
        // Initialize mailer configuration
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.MAIL_HOST || '',
            port: parseInt(process.env.SMTP_PORT || '0', 10),
            secure: process.env.SMTP_SECURE === 'true', // Convert to boolean
            auth: {
                user: process.env.MAIL_USERNAME || '',
                pass: process.env.MAIL_PASSWORD || '',
            },
        });
        // Additional company details
        this.companyName = process.env.COMPANY_NAME || '';
        this.companyLogo = process.env.COMPANY_LOGO_URL || '';
        this.from = process.env.FROM_EMAIL || '';
    }
    getTransporter() {
        return this.transporter;
    }
    // Method to get company name
    getCompanyName() {
        return this.companyName;
    }
    // Method to get company logo URL
    getCompanyLogo() {
        return this.companyLogo;
    }
    // Method to get from address
    getFromAddress() {
        return this.from;
    }
}
const mailConfig = new MailConfig();
exports.default = mailConfig;
