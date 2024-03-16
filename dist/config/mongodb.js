"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = require("dotenv");
dotenv.config();
function connectMongo(app, URL) {
    mongoose_1.default.connect(URL).then(() => {
        console.log("App is connected to MONGO DB");
    }).catch((error) => {
        console.log("App is not connected to MONGO DB, Make sure that the IP is whitelisted");
        console.log(error);
    });
}
exports.default = { connectMongo };
