const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const authService = require(`${appRoot}/services/auth.service`);
const { initialize } = require(`${appRoot}/lib/passport`);
initialize(passport, authService.getUserByEmail, authService.getUserById);

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

                const {name, mobile_no, email} = user;
                const auth_user = {name, mobile_no, email};
                const token = jwt.sign({...auth_user, id: user._id}, process.env.SECRET);

                return res.status(200).json({
                    code: 200,
                    status: 'success',
                    message: info,
                    results: {...auth_user, token}
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