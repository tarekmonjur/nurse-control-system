const express = require('express');
const router = express.Router();
const UserController = require('./../../controllers/user.controller');
const userService = require('./../../services/user.service');

router.get('/', async (req, res) => {
    try {
        const filter = userService.makeFilter(req);
        const results = await UserController.index(filter);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Gets users success.',
            results: results
        });
    } catch (err) {
        const statusCode = err.code < 599 ? err.code : 503;
        return res.status(statusCode).json({
            code: statusCode,
            status: 'error',
            message: err.message,
            errors: err.code < 599 ? err.errors : err.message ,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const errors = userService.handleValidate(req.body);
        if (errors) {
            return res.status(errors.code).json(errors);
        }
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
            code: statusCode,
            status: 'error',
            message: err.message,
            errors: err.code < 599 ? err.errors : err.message ,
        });
    }

});

router.get('/:user_id', async (req, res) => {
    try {
        const results = await UserController.view(req.params.user_id);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'User Details',
            results: results
        });
    } catch (err) {
        const statusCode = err.code < 599 ? err.code : 500;
        return res.status(statusCode).json({
            code: err.code || statusCode,
            status: 'error',
            message: err.message,
            errors: err.errors,
        });
    }

});

router.put('/:user_id', async (req, res) => {

    try {
        const errors = userService.handleValidate(req.body, true);
        if (errors) {
            return res.status(errors.code).json(errors);
        }
        const payload = {...req.body, _id: req.params.user_id};
        const result = await UserController.update(payload);

        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'User updated Successfully.',
            results: result
        });
    } catch (err) {
        const statusCode = err.code < 599 ? err.code : 500;
        return res.status(statusCode).json({
            code: err.code || statusCode,
            status: 'error',
            message: err.message,
            errors: err.errors || {},
        });
    }

});

router.delete('/:user_id', async (req, res) => {
    try {
        param('user_id')
            .notEmpty().withMessage('User id is required')
            .run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError('Validation Error!!', errors.errors);
        }
        const results = await UserController.delete(req.params.user_id);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'User Deleted Successfully.',
            results: results
        });
    } catch (err) {
        const statusCode = err.code < 599 ? err.code : 500;
        return res.status(statusCode).json({
            code: err.code,
            status: 'error',
            message: err.message,
            errors: err.errors,
        });
    }

});

module.exports = router;