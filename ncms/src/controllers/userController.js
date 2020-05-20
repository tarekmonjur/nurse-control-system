
const User = require('../models/user.model');
const ValidationError = require('../lib/validationError');

class UserController {

    constructor() {
        console.log('sdfsfd');
    }

    static async store(payload) {
        const user = new User(payload);
        const error = user.validateSync();
        if (error && error.errors) {
            throw new ValidationError('DB fields error', error.errors);
        }
        return await user.save();
    }
}

module.exports = UserController;