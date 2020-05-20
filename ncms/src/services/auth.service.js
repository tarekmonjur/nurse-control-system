const { body, validationResult } = require('express-validator');
const ValidationError = require('./../lib/validationError');
const User = require('./../models/user.model');

module.exports = {
    async loginValidate(req) {
        await body('email')
          .notEmpty().withMessage('The email is required')
          .isEmail().withMessage('Please enter valid email')
          .normalizeEmail().run(req);
        await body('password')
          .not().isEmpty().withMessage('The password is required.')
          .isLength({ min: 6, max: 20}).withMessage('Password must be min 6 and max 20 chars long').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          throw new ValidationError('Validation Error!!', errors.errors);
        }
    },

    async getUserByEmail(email) {
        return await User.findOne({email: email});
    },

    async getUserById(id) {
        return await User.findById(id, {'_id': 0}).select('name email mobile_no');
    }
};