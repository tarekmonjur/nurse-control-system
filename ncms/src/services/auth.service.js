const { body, validationResult } = require('express-validator');
const ValidationError = require('./../lib/validationError');
const User = require('./../models/user.model');
const Employee = require('./../models/employee.model');
const Doctor = require('./../models/doctor.modal');
const { Nurse } = require('./../models/nurse.modal');

module.exports = {
    async loginValidate(req) {
        await body('username')
            .notEmpty().withMessage('The username is required')
            .isLength({ min: 3, max: 20}).withMessage('username must be min 3 and max 20 chars long')
            .run(req);
        await body('password')
            .not().isEmpty().withMessage('The password is required.')
            .isLength({ min: 6, max: 20}).withMessage('Password must be min 6 and max 20 chars long')
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError('Validation Error!!', errors.errors);
        }
    },

    async getUserByUsername(username) {
        return await User.findOne({username: username});
    },

    async getUserById(id) {
        return await User.findById(id, {'_id': 0}).select('username type token');
    },

    async getUserByIdAndType(id, type) {
        let user;
        if (type === 'employees') {
            user = await Employee.findOne({user: id});
        }
        if (type === 'doctors') {
            user = await Doctor.findOne({user: id});
        }
        if (type === 'nurses') {
            user = await Nurse.findOne({user: id});
        }
        return user;
    },

    async updateAuthTokenById(id, token) {
        return await User.updateOne({_id: id}, {token: token});
    }
};