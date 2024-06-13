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
const passport_1 = __importDefault(require("passport"));
function SessionHandshake(router) {
    router.post('/session/handshake', passport_1.default.authenticate('local'), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("user", req.user);
            console.log("authorization", req.headers["authorization"]);
            console.log("session", req.headers["session"]);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }));
    router.get('/session/verify', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("user", req.user);
            console.log("authorization", req.headers["authorization"]);
            console.log("session", req.headers["session"]);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }));
    return router;
}
exports.default = SessionHandshake;
// module.exports = function (app: any) {
//     // TODO
//     router.post('/login', passport.authenticate('local',
//         {
//             failureRedirect: '/login-failure',
//             successRedirect: '/login-success'
//         }),);
//     // TODO
//     router.post('/register', (req, res, next) => {
//         const saltHash = genPassword(req.body.password);
//         const salt = saltHash.salt;
//         const hash = saltHash.hash;
//         const newUser = new User({
//             username: req.body.username,
//             hash: hash,
//             salt: salt,
//             admin: true
//         })
//         newUser.save().then((user) => {
//         })
//         res.redirect('/login')
//     });
//     return router;
// };
