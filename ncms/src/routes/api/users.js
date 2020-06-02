const express = require('express');
const router = express.Router();
const UserController = require(`${appRoot}/controllers/user.controller`);
const userService = require('./../../services/user.service');

router.get('/', (req, res) => {
    const users = {};
    return res.status(200).json(users);
});

router.post('/', async (req, res) => {
    try {
        // const errors = userService.handleValidate(req.body);
        // if (errors) {
        //     return res.status(errors.code).json(errors);
        // }
        const result = await UserController.store(req.body);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'User created Successfully',
            results: result
        });
    } catch (err) {
        const statusCode = err.code < 599 ? err.code : 503;
        return res.status(statusCode).json({
            code: err.code,
            status: 'error',
            message: err.message,
            errors: err.errors,
        });
    }

});

module.exports = router;