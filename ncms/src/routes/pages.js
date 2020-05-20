const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require(`${appRoot}/lib/passport`);

router.use((req, res, next) => {
    if (req.path) {
        res.locals.route = req.path.split('/')[1];
    }
    next();
});

router.get('/login', checkNotAuthenticated, (req, res) => {
    return res.render('login');
});

router.get('/', checkAuthenticated, (req, res) => {
    return res.render('home');
});

router.get('/patients', checkAuthenticated, (req, res) => {
    return res.render('patient');
});

router.get('/logout', checkAuthenticated, (req, res) => {
    req.logout();
    return res.redirect('/login');
});

module.exports = router;