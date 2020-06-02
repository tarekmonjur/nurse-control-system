const Patient = require('./../models/patient.modal');
const ValidationError = require('../lib/validationError');
const patientService = require('./../services/patient.service');
const List = require('./../lib/list');

class PatientController {
    static async index(filter) {
        const patients = await patientService.getAllPatients(filter);
        const list = new List(filter, patients).generate();
        return list
    }

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