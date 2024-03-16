"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.isTokenVerified = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        next();
    }
    else {
        res.status(401).json({
            mgs: 'You are not authorized to view this page'
        });
    }
};
