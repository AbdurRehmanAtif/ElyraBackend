const express = require('express');
const session = require('express-session');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

module.exports = router;