const express = require('express');
const router = express.Router();
const passport = require('passport');
const { User } = require('../model/user.modal')
const session = require('express-session');
const isAuth = require('../middleware/auth').isAuth;
const isAdmin = require('../middleware/auth').isAdmin;
const utils = require('../../lib/passwordUtils');
const authController = require('../controllers/authControllers');

module.exports = function (app) {

    router.post('/api/v1/login', async (req, res, next) => {
        try {
            await authController.login(req, res, next)
        } catch (error) {
            next(error)
        }
        
    })

    router.post('/api/v1/register', async (req, res, next) => {
        try {
            await authController.register(req, res, next);
        } catch (error) {
            next(error)
        }
    });


    router.get('/api/protected', passport.authenticate('jwt', {
        session: false
    }), (req, res, next) => {
        res.status(200).json({
            success: true,
            msg: "You are authorized"
        })
    });
    return router;
};