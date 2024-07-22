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
const apiResponse_1 = __importDefault(require("../../utils/apiResponse"));
const validation_1 = __importDefault(require("../../utils/validation"));
const AuthService_1 = __importDefault(require("../../services/AuthService"));
const ProfileService_1 = __importDefault(require("../../services/ProfileService"));
const ProfileController = {
    saveProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //basic validation
                // await Validation.basicValidation(req.body);
                // Loop through the keys in req.body
                const _id = yield AuthService_1.default.getUserIDFromJWT(req);
                // Save the results in profile
                const result = yield ProfileService_1.default.saveUserProfile(req, _id);
                // Respond with a success status and the registered user's information
                return res.status(200).json(new apiResponse_1.default(200, 'Profile Update Confirmation', 'Profile information has been successfully updated.', result));
            }
            catch (err) {
                next(err);
            }
        });
    },
    getProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Loop through the keys in req.body
                const _id = yield AuthService_1.default.getUserIDFromJWT(req);
                // Save the results in profile
                let profile = yield ProfileService_1.default.getUserProfileByID(_id);
                // if results are null return a user object but with emai
                const user = req.user;
                const result = Object.assign(Object.assign({}, profile === null || profile === void 0 ? void 0 : profile.toObject()), { "email": user.email });
                // // Respond with a success status and the registered user's information
                return res.status(200).json(new apiResponse_1.default(200, '', 'Profile information retrieved successfully', result));
            }
            catch (err) {
                next(err);
            }
        });
    },
    saveAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //basic validation
                yield validation_1.default.basicValidation(req.body);
                // Loop through the keys in req.body
                const _id = yield AuthService_1.default.getUserIDFromJWT(req);
                // Save the results in profile
                const result = yield ProfileService_1.default.saveAddress(req, _id);
                // Respond with a success status and the registered user's information
                return res.status(200).json(new apiResponse_1.default(200, '', 'Address information saved successfully', result));
            }
            catch (err) {
                next(err);
            }
        });
    },
    getProfileDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Loop through the keys in req.body
                const _id = yield AuthService_1.default.getUserIDFromJWT(req);
                // Save the results in profile
                let result = yield ProfileService_1.default.profileDetails(_id);
                result = yield ProfileService_1.default.DecryptProfileDetails(result);
                // Respond with a success status and the registered user's information
                return res.status(200).json(new apiResponse_1.default(200, '', '', result));
            }
            catch (err) {
                next(err);
            }
        });
    }
};
exports.default = ProfileController;
