import { Request, Response, NextFunction } from 'express';


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