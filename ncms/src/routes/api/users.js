const express = require('express');
const router = express.Router();
const validator = require('validator');
const {isEmpty} = require('lodash');
const UserController = require(`${appRoot}/controllers/userController`);
const ValidationError = require(`${appRoot}/lib/validationError`);

router.get('/', (req, res) => {
    const users = {};
    return res.status(200).json(users);
});

router.post('/', async (req, res) => {
    const errors = {};
    const payload = {
        name: req.body.name || '',
        email: req.body.email || '',
        mobile_no: req.body.mobile_no || '',
        password: req.body.password || '',
        confirm_password: req.body.confirm_password || '',
    };

    if (!validator.isLength(payload.name || '', {min: 3, max: 50})) {
        errors.name = 'Must be contain min:3 max:10 length';
    }
    if (validator.isEmpty(payload.name || '')) {
        errors.name = 'The name is required';
    }
    if (!validator.isEmail(payload.email || '')) {
        errors.email = 'Please enter valid email';
    }
    if (validator.isEmpty(payload.email || '')) {
        errors.email = 'The email is required';
    }
    if (!validator.isEmpty(payload.mobile_no || '') &&
        !validator.isMobilePhone(payload.mobile_no || '',['bn-BD'])) {
        errors.mobile_no = 'Please enter valid mobile no';
    }
    if (validator.isEmpty(payload.password)) {
        errors.password = 'The password is required';
    }
    if (!validator.equals(payload.password, payload.confirm_password)) {
        errors.confirm_password = 'Please enter the same password';
    }

    try {
        if (!isEmpty(errors)) {
            throw new ValidationError('Validation Error!!', errors);
        }
        const result = await UserController.store(payload);
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