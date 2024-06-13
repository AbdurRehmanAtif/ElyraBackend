"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, email, salt, hash, role) {
        this.id = id;
        this.email = email;
        this.salt = salt;
        this.hash = hash;
        this.role = role;
    }
}
exports.User = User;
