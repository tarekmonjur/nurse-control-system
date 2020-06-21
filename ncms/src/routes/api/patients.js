const express = require('express');
const router = express.Router();
const PatientController = require('./../../controllers/patient.controller');
const patientService = require('./../../services/patient.service');
const { param, validationResult } = require('express-validator');
const ValidationError = require('./../../lib/validationError');

router.get('/', async (req, res) => {
    const filter = patientService.makeFilter(req);
    const results = await PatientController.index(filter);
    return res.status(200).json({
        code: 200,
        status: 'success',
        message: 'Patients get success.',
        results: results
    });
});

router.post('/', async (req, res) => {

    try {
        const errors = patientService.handleValidate(req.body);
        if (errors) {
            return res.status(errors.code).json(errors);
        }
        // const payload = patientService.makePayload(req.body);
        const result = await PatientController.store(req.body);

        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Patient created Successfully.',
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

router.get('/:patient_id', async (req, res) => {
    try {
        param('patient_id')
            .notEmpty().withMessage('patient id is required')
            .isLength({ min: 6, max: 20}).withMessage('patient id must be min 6 and max 20 chars long')
            .run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError('Validation Error!!', errors.errors);
        }
        const results = await PatientController.view(req.params.patient_id);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Patient Details',
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

router.put('/:patient_id', async (req, res) => {

    try {
        const errors = patientService.handleValidate(req.body);
        if (errors) {
            return res.status(errors.code).json(errors);
        }
        const payload = {...req.body, _id: req.params.patient_id};
        const result = await PatientController.update(payload);

        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Patient updated Successfully.',
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

router.delete('/:patient_id', async (req, res) => {
    try {
        param('patient_id')
            .notEmpty().withMessage('patient id is required')
            .isLength({ min: 6, max: 20}).withMessage('patient id must be min 6 and max 20 chars long')
            .run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError('Validation Error!!', errors.errors);
        }
        const results = await PatientController.delete(req.params.patient_id);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Patient Deleted Successfully.',
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