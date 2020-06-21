const express = require('express');
const router = express.Router();
const BedController = require('./../../controllers/bed.controller');
const bedService = require('./../../services/bed.service');
const { param, validationResult } = require('express-validator');
const ValidationError = require('./../../lib/validationError');

router.get('/', async (req, res) => {
    const filter = bedService.makeFilter(req);
    const results = await BedController.index(filter);
    return res.status(200).json({
        code: 200,
        status: 'success',
        message: 'Beds get success.',
        results: results
    });
});

router.post('/', async (req, res) => {

    try {
        const errors = bedService.handleValidate(req.body);
        if (errors) {
            return res.status(errors.code).json(errors);
        }
        const result = await BedController.store(req.body);

        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Bed created Successfully.',
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

router.get('/:bed_id', async (req, res) => {
    try {
        param('bed_id')
            .notEmpty().withMessage('bed id is required')
            .run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError('Validation Error!!', errors.errors);
        }
        const results = await BedController.view(req.params.bed_id);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Bed Details',
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

router.put('/:bed_id', async (req, res) => {

    try {
        const errors = bedService.handleValidate(req.body);
        if (errors) {
            return res.status(errors.code).json(errors);
        }
        const payload = {...req.body, _id: req.params.bed_id};
        const result = await BedController.update(payload);

        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Bed updated Successfully.',
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

router.delete('/:bed_id', async (req, res) => {
    try {
        param('bed_id')
            .notEmpty().withMessage('bed id is required')
            .run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError('Validation Error!!', errors.errors);
        }
        const results = await BedController.delete(req.params.bed_id);
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Bed Deleted Successfully.',
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