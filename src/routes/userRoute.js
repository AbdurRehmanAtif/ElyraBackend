const express = require('express');
const router = express.Router();
const passport = require('passport');
const { User } = require('../model/user.modal')
const UserController = require('../controllers/userController')

module.exports = function (app) {

    router.post('/api/v1/profile',
        passport.authenticate('jwt', { session: false }),
        async (req, res, next) => {
            try {
                await UserController.saveProfile(req, res, next)

            } catch (error) {
                next(error)
            }
        }
    )
    router.get('/api/v1/profile',
        passport.authenticate('jwt', { session: false }),
        async (req, res, next) => {
            try {
                await UserController.Profile(req, res, next)

            } catch (error) {
                next(error)
            }
        }
    )
    router.post('/api/v1/address',
        passport.authenticate('jwt', { session: false }),
        async (req, res, next) => {
            await UserController.saveAddress(req, res, next)
        }
    )

    router.get('/api/v1/userDetails',
        passport.authenticate('jwt', { session: false }),
        async (req, res, next) => {
            await UserController.getProfileDetails(req, res, next)
        }
    )
    return router;
};