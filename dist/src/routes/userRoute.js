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
const passport = require("passport");
const UserController = require('../controllers/userController');
function userProfileRoutes(router) {
    router.post('/api/v1/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield UserController.saveProfile(req, res, next);
        }
        catch (error) {
            next(error);
        }
    }));
    router.get('/api/v1/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield UserController.Profile(req, res, next);
        }
        catch (error) {
            next(error);
        }
    }));
    router.post('/api/v1/address', passport.authenticate('jwt', { session: false }), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        yield UserController.saveAddress(req, res, next);
    }));
    router.get('/api/v1/userDetails', passport.authenticate('jwt', { session: false }), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        yield UserController.getProfileDetails(req, res, next);
    }));
    return router;
}
exports.default = userProfileRoutes;
;
