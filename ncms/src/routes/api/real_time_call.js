const express = require('express');
const router = express.Router();
const patientNurseCallService = require('./../../services/patient_nurse_call.service');
const List = require('./../../lib/list');

router.get('/', async (req, res) => {
    try {
        const todate = new Date();
        const date = new Date(todate.setHours(todate.getHours() - 24));
        req.filter = {
            created_at: {$gt: date},
        };
        const filters = patientNurseCallService.makeFilter(req);
        const all_calls = await patientNurseCallService.getAllRealCall(filters);
        const list = new List(filters, all_calls).generate();

        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Real time call get success.',
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