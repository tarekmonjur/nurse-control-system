const express = require('express');
const router = express.Router();
const authService = require('./../service/authService');

router.get('/', async (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const payload = {
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const auth = await authService.checkAuth(payload);
        if (auth) {
            req.session.user = auth;
            console.log(req.session.user);
            res.json(auth);
        } else {
            res.status(403).send({error: 'username/password invalid'});
        }
    } catch (err) {
        res.status(503).send(err);
    }
});

module.exports = router;