const ValidationError = require('../lib/validationError');
const doctorService = require('./../services/doctor.service');
const List = require('./../lib/list');

class DoctorController {
    static async index(filter) {
        const doctors = await doctorService.getAllDcotors(filter);
        const list = new List(filter, doctors).generate();
        return list
    }

    static async store(payload) {
        return await doctorService.upsertDoctor(payload);
    }

    static async view(id) {
        return await doctorService.getDoctorById(id);
    }

    static async update(payload) {
        const doctor = await doctorService.getDoctorById(payload._id);
        if (!doctor) {
            throw new ValidationError('Doctor not found', {}, 404);
        }
        payload = Object.assign(doctor, payload);
        return await doctorService.upsertDoctor(payload, false);
    }

    static async delete(id) {
        return await doctorService.deleteDoctorById(id);
    }
}

module.exports = DoctorController;