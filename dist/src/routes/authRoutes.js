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
const authControllers_1 = __importDefault(require("../controllers/auth/authControllers"));
const passport_1 = __importDefault(require("passport"));
const apiError_1 = __importDefault(require("../utils/apiError"));
function AuthRoutes(router) {
    router.post('/api/v1/login', passport_1.default.authenticate('local'), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield authControllers_1.default.login(req, res, next);
        }
        catch (error) {
            const foo = new apiError_1.default({ success: false, statusCode: 404, title: "Credentials Error", message: "No user found with the following credentials" });
            next(foo);
        }
    }));
    // router.get('/api/v1/loginError', (req: Request, res: Response) => {
    //     try {
    //         return res.status(404).json({ success: false, statusCode: 404, title: "Credentials Error", message: "No user found with the following credentials" });
    //     } catch (error) {
    //         // Handle the error
    //         console.log("yay walala error chal raha a")
    //         return res.status(404).json({ success: false, statusCode: 404, title: "Credentials Error", message: "No user found with the following credentials" });
    //     }
    // });
    router.post('/api/v1/register', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield authControllers_1.default.register(req, res, next);
        }
        catch (error) {
            next(error);
        }
    }));
    router.post('/api/v1/forgotPassword', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield authControllers_1.default.forgotPassword(req, res, next);
        }
        catch (error) {
            next(error);
        }
    }));
    return router;
}
exports.default = AuthRoutes;
