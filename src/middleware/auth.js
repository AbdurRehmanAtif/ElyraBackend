module.exports.isAuth = (req, res, next) => {

    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({
            mgs: 'You are not authorized to view this page'
        })
    }
}
module.exports.isAdmin = (req, res, next) => {

    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.status(401).json({
            mgs: 'You are not authorized to view this page'
        })
    }

}