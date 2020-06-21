const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require(`${appRoot}/lib/passport`);

router.use((req, res, next) => {
    if (req.path) {
        res.locals.data = Object.assign({}, res.locals, {route: ''});
        res.locals.data.route = req.path.split('/')[1];
    }
    next();
});

router.get('/login', checkNotAuthenticated, (req, res) => {
    return res.render('login');
});

router.get('/logout', checkAuthenticated, (req, res) => {
    req.logout();
    return res.redirect('/login');
});

router.get('/', checkAuthenticated, (req, res) => {
    return res.render('home');
});

router.get('/patients', checkAuthenticated, (req, res) => {
    return res.render('patient');
});

router.get('/beds', checkAuthenticated, (req, res) => {
    return res.render('bed');
});

router.get('/doctors', checkAuthenticated, (req, res) => {
    return res.render('doctor');
});

router.get('/nurses', checkAuthenticated, (req, res) => {
    return res.render('nurse');
});

router.get('/call-history', checkAuthenticated, (req, res) => {
    return res.render('call_history');
});

router.get('/real-time-call', checkAuthenticated, (req, res) => {
    return res.render('real_time_call');
});

router.get('/reports', checkAuthenticated, (req, res) => {
    return res.render('report');
});

module.exports = router;