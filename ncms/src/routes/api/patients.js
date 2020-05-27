const express = require('express');
const patientService = require('./../../services/patient.service');
const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({

    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    const errors = patientService.handleValidate(req.body);
    if (errors) {
        return res.status(200).json(errors);
    }
    return res.status(200).json({
        code: 200,
        status: 'success',
        message: 'Patient created Successfully',
        results: {}
    });
});

module.exports = router;