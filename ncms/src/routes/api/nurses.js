const express = require('express');
const router = express.Router();
const NurseController = require('./../../controllers/nurse.controller');
const nurseService = require('./../../services/nurse.service');
const { param, validationResult } = require('express-validator');
const ValidationError = require('./../../lib/validationError');

router.get('/', async (req, res) => {
    const filter = nurseService.makeFilter(req);
    const results = await NurseController.index(filter);
    return res.status(200).json({
        code: 200,
        status: 'success',
        message: 'Nurses get success.',
        results: results
    });
});

router.post('/', async (req, res) => {

    try {
        const errors = nurseService.handleValidate(req.body);
        if (errors) {
            return res.status(errors.code).json(errors);
        }
        const result = await NurseController.store(req.body);

        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Nurse created Successfully.',
            results: result
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

router.get('/:nurse_id', async (req, res) => {
    try {
        param('nurse_id')
            .notEmpty().withMessage('nurse id is required')
            .run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError('Validation Error!!', errors.errors);
        }
        const results = await NurseController.view(req.params.nurse_id);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Nurse Details',
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

router.put('/:nurse_id', async (req, res) => {

    try {
        const errors = nurseService.handleValidate(req.body);
        if (errors) {
            return res.status(errors.code).json(errors);
        }
        const payload = {...req.body, _id: req.params.nurse_id};
        const result = await NurseController.update(payload);

        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Nurse updated Successfully.',
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

router.delete('/:nurse_id', async (req, res) => {
    try {
        param('nurse_id')
            .notEmpty().withMessage('nurse id is required')
            .run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError('Validation Error!!', errors.errors);
        }
        const results = await NurseController.delete(req.params.nurse_id);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Nurse Deleted Successfully.',
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