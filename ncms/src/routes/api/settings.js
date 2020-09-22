const express = require('express');
const router = express.Router();
const SettingsController = require('./../../controllers/settings.controller');
const settingsService = require('./../../services/settings.service');
const {multerUpload} = require('./../../lib/upload');

router.get('/', async (req, res) => {
    try {
        const filter = settingsService.makeFilter(req);
        const results = await SettingsController.index(filter);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Gets settings success.',
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

router.put('/', multerUpload().single('logo'), async (req, res) => {
    try {
        const errors = settingsService.handleValidate(req.body, true);
        if (errors) {
            return res.status(errors.code).json(errors);
        }
        const payload = {...req.body};
        payload.logo = (req.file) ? req.file.filename : req.body.logo;
        const result = await SettingsController.update(payload);

        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Settings updated Successfully.',
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


module.exports = router;