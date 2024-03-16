"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuth = void 0;
function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).json({
            mgs: 'You are not authorized to view this page'
        });
    }
}
exports.isAuth = isAuth;
function isAdmin(req, res, next) {
    // Assuming req.user is of type User
    if (req.isAuthenticated() && req.user.admin) {
        next();
    }
    else {
        res.status(401).json({
            msg: 'You are not authorized to view this page'
        });
    }
}
exports.isAdmin = isAdmin;
