const express = require('express');
const router = express.Router();
const AuthService = require('./../service/AuthService');

router.get('/', async (req, res) => {
    // const users = await userService.getUser({});
    // console.log('route2', users);
    res.render('signup');
});

router.post('/', async (req, res) => {
    try {
        const payload = req.body;
        console.log(JSON.stringify(req.file));
        payload.photo = (req.file) ? req.file.filename : req.body.photo;
        const newUser = await AuthService.createUser(payload);
        console.log(newUser.ops[0]);
        res.json({
            status: 'success',
            message: '',
            result: newUser.ops[0],
            error: null,
        });
    } catch (err) {
        console.log('error', {err});
        res.status(503).send({
            status: 'error',
            message: 'signup not success',
            result: null,
            error: {
                code: 503,
                message: err.message
            }
        });
    }
});

module.exports = router;

