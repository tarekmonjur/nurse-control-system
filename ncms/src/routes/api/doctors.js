const express = require('express');
const router = express.Router();
const DoctorController = require('./../../controllers/doctor.controller');
const doctorService = require('./../../services/doctor.service');
const { param, validationResult } = require('express-validator');
const ValidationError = require('./../../lib/validationError');

router.get('/', async (req, res) => {
    const filter = doctorService.makeFilter(req);
    const results = await DoctorController.index(filter);
    return res.status(200).json({
        code: 200,
        status: 'success',
        message: 'Doctors get success.',
        results: results
    });
});

router.post('/', async (req, res) => {

    try {
        const errors = doctorService.handleValidate(req.body);
        if (errors) {
            return res.status(errors.code).json(errors);
        }
        const result = await DoctorController.store(req.body);

        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Doctor created Successfully.',
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

router.get('/:doctor_id', async (req, res) => {
    try {
        param('doctor_id')
            .notEmpty().withMessage('doctor id is required')
            .run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError('Validation Error!!', errors.errors);
        }
        const results = await DoctorController.view(req.params.doctor_id);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Doctor Details',
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

router.put('/:doctor_id', async (req, res) => {

    try {
        const errors = doctorService.handleValidate(req.body);
        if (errors) {
            return res.status(errors.code).json(errors);
        }
        const payload = {...req.body, _id: req.params.doctor_id};
        const result = await DoctorController.update(payload);

        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Doctor updated Successfully.',
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

router.delete('/:doctor_id', async (req, res) => {
    try {
        param('doctor_id')
            .notEmpty().withMessage('doctor id is required')
            .run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError('Validation Error!!', errors.errors);
        }
        const results = await DoctorController.delete(req.params.doctor_id);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Doctor Deleted Successfully.',
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