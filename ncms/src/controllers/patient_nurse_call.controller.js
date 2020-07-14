const ValidationError = require('../lib/validationError');
const patientNurseCallService = require('./../services/patient_nurse_call.service');
const List = require('./../lib/list');

class PatientNurseCallController {
    static async index(filter) {
        const call_histories = await patientNurseCallService.getAllCallHistories(filter);
        const list = new List(filter, call_histories).generate();
        return list
    }

    static async store(payload) {
        return await patientNurseCallService.upsertNurse(payload);
    }

    static async view(id) {
        return await patientNurseCallService.getNurseById(id);
    }

    static async update(payload) {
        const nurse = await patientNurseCallService.getNurseById(payload._id);
        if (!nurse) {
            throw new ValidationError('Nurse not found', {}, 404);
        }
        payload = Object.assign(nurse, payload);
        return await patientNurseCallService.upsertNurse(payload, false);
    }

    static async delete(id) {
        return await patientNurseCallService.deleteNurseById(id);
    }
}

module.exports = PatientNurseCallController;