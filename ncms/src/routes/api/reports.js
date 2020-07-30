const express = require('express');
const router = express.Router();
const NurseCallReportController = require('./../../controllers/nurse_call_report.controller');
const ValidationError = require('./../../lib/validationError');

router.get('/daily-patient-nurse-call-summary', async (req, res) => {
    try {
        const filters = {filter: {}};
        const list = await NurseCallReportController.dailyPatientNurseCallReport(filters);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Daily patient nurse call report.',
            results: list
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

router.get('/monthly-patient-nurse-call-summary', async (req, res) => {
    try {
        // const filters = {filter: {nurse: {$ne: null}}};
        const filters = {filter: {}};
        const list = await NurseCallReportController.monthlyPatientNurseCallReport(filters);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Monthly patient nurse call report.',
            results: list
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