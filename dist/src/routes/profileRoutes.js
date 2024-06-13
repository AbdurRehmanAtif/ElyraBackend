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
const passport = require("passport");
// const UserController: any = require('../controllers/userController');
const ProfileController_1 = __importDefault(require("../controllers/profile/ProfileController"));
function ProfileRoutes(router) {
    router.post('/api/v1/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield ProfileController_1.default.saveProfile(req, res, next);
        }
        catch (error) {
            next(error);
        }
    }));
    router.get('/api/v1/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield ProfileController_1.default.getProfile(req, res, next);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }));
    router.post('/api/v1/address', passport.authenticate('jwt', { session: false }), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        yield ProfileController_1.default.saveAddress(req, res, next);
    }));
    router.get('/api/v1/userDetails', passport.authenticate('jwt', { session: false }), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        yield ProfileController_1.default.getProfileDetails(req, res, next);
    }));
    return router;
}
exports.default = ProfileRoutes;
;
