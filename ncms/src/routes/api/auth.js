const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const authService = require('./../../services/auth.service');
const { initialize } = require('./../../lib/passport');
initialize(passport, authService.getUserByUsername, authService.getUserById);

router.post('/', async (req, res, next) => {
    try {
        await authService.loginValidate(req);
        passport.authenticate('local', (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({
                    code: 401,
                    status: 'error',
                    message: info,
                    errors: err
                });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return res.status(401).json({
                        code: 401,
                        status: 'error',
                        message: err.message,
                        errors: err
                    });
                }

                const token = jwt.sign({type: user.type, id: user._id}, process.env.SECRET);
                authService.updateAuthTokenById(user._id, token);

                return res.status(200).json({
                    code: 200,
                    status: 'success',
                    message: info,
                    results: {...user, token}
                });
            });
        })(req, res);
    } catch (err) {
        return res.status(err.code).json({
            code: err.code,
            status: 'error',
            message: err.message,
            errors: err.errors,
        });
    }

});

module.exports = router;