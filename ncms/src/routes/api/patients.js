const express = require('express');
const PatientController = require('./../../controllers/patient.controller');
const patientService = require('./../../services/patient.service');
const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({

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
            message: 'Patient created Successfully',
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