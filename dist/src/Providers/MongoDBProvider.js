"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = require("dotenv");
dotenv.config();
class MongoDBProvider {
    constructor() {
        mongoose_1.default.connect(process.env.MONGO_DB_URL || "")
            .then(() => {
            console.log("App is connected to MongoDB");
        })
            .catch((error) => {
            console.error("App failed to connect to MongoDB:", error);
        });
    }
}
exports.default = MongoDBProvider;
