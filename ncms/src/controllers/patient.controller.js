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
        console.debug({payload});
        const bed = await patientService.getBedById(payload.bed);
        if (!bed) {
            throw new ValidationError('Bed not found', {}, 404);
        }
        payload.bed = bed;
        return await patientService.upsertPatient(payload);
    }

    static async view(id) {
        return await patientService.getPatientById(id);
    }

    static async update(payload) {
        const patient = await patientService.getPatientById(payload._id);
        if (!patient) {
            throw new ValidationError('Patient not found', {}, 404);
        }
        const bed = await patientService.getBedById(payload.bed);
        if (!bed) {
            throw new ValidationError('Bed not found', {}, 404);
        }
        payload.bed = bed;
        payload = Object.assign(patient, payload);
        return await patientService.upsertPatient(payload, false);
    }

    static async delete(id) {
        return await patientService.deletePatientById(id);
    }
}

module.exports = PatientController;