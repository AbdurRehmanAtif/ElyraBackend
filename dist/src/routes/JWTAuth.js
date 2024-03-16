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
const authControllers_1 = __importDefault(require("../controllers/authControllers"));
function JWTAuthRoutes(router) {
    router.post('/api/v1/login', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield authControllers_1.default.login(req, res, next);
        }
        catch (error) {
            next(error);
        }
    }));
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
exports.default = JWTAuthRoutes;
