const express = require('express');
const router = express.Router();
const NurseCallReportController = require('./../../controllers/nurse_call_report.controller');
const ValidationError = require('./../../lib/validationError');

router.get('/daily-patient-nurse-call-summary', async (req, res) => {
    try {
        const report_type = req.query.report;
        let filters = {filter: {}};

        if (report_type === 'date_wise') {
            filters = {filter: {}};
        }
        else if (report_type === 'nurse_wise') {
            filters = {filter: {}};
        }
        const type = `daily_${report_type}_report`;
        const list = await NurseCallReportController.dailyPatientNurseCallReport(type, filters);
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
        const report_type = req.query.report;
        let filters = {filter: {}};

        if (report_type === 'date_wise') {
            // filters = {filter: {nurse: {$ne: null}}};
            filters = {filter: {}};
        }
        else if (report_type === 'nurse_wise') {
            filters = {filter: {}};
        }
        const type = `monthly_${report_type}_report`;
        const list = await NurseCallReportController.monthlyPatientNurseCallReport(type, filters);

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