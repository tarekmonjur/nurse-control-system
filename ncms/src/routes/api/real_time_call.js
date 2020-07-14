const express = require('express');
const router = express.Router();
const PatientNurseCallController = require('./../../controllers/patient_nurse_call.controller');
const patientNurseCallService = require('./../../services/patient_nurse_call.service');
const ValidationError = require('./../../lib/validationError');

router.get('/', async (req, res) => {
    const filter = patientNurseCallService.makeFilter(req);
    const results = await PatientNurseCallController.index(filter);
    return res.status(200).json({
        code: 200,
        status: 'success',
        message: 'Real time call get success.',
        results: results
    });
});

module.exports = router;