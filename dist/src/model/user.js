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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRoles = void 0;
const users_1 = require("../db/users");
var UserRoles;
(function (UserRoles) {
    UserRoles["Admin"] = "admin";
    UserRoles["User"] = "user";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
class User extends users_1.Users {
    // Define the register method with the correct data type
    static register(doc) {
        return __awaiter(this, void 0, void 0, function* () {
            // Save the user data to the database
            return yield new users_1.Users(doc).save();
        });
    }
    static findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_1.Users.findOne({ email });
        });
    }
    static findOneByID(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_1.Users.findOne({ _id });
        });
    }
}
exports.User = User;
