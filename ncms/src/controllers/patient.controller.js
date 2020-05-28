const Patient = require('./../models/patient.modal');
const ValidationError = require('../lib/validationError');

class PatientController {
    static async store(payload) {
        const patient = new Patient(payload);
        const error = patient.validateSync();
        if (error && error.errors) {
            console.log(error.errors);
            throw new ValidationError('Patient fields error', error.errors);
        }
        return await patient.save();
    }
}

module.exports = PatientController;