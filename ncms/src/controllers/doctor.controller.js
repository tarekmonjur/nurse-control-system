const ValidationError = require('../lib/validationError');
const doctorService = require('./../services/doctor.service');
const userService = require('./../services/user.service');
const List = require('./../lib/list');
const {isEmpty, get} = require('lodash');

class DoctorController {

    static async index(filter) {
        const doctors = await doctorService.getAllDcotors(filter);
        const list = new List(filter, doctors).generate();
        return list
    }

    static async store(payload) {
        try {
            if (!isEmpty(payload.username) && !isEmpty(payload.password)) {
                payload['type'] = 'doctors';
                payload['user'] = await userService.upsertUser(payload);
            }

            payload['group'] = await userService.getGroupByName('Doctor');
            const result = await doctorService.upsertDoctor(payload);

            if (get(result, 'nurse') && get(result, '_id')) {
                await doctorService.updateDoctorToNurse(result);
            }

            return result;
        } catch (err) {
            console.log('Data Not Store', {err});
            throw err;
        }
    }

    static async view(id) {
        return await doctorService.getDoctorById(id);
    }

    static async update(payload) {
        try {
            const doctor = await doctorService.getDoctorById(payload._id);
            if (!doctor) {
                throw new ValidationError('Doctor not found', {}, 404);
            }

            const user_payload = {};
            if (!isEmpty(payload.username)) {
                user_payload['username'] = payload.username;
            }

            if (!isEmpty(payload.password)) {
                user_payload['password'] = payload.password;
            }

            if (!isEmpty(user_payload)) {
                let isNew;
                if (isEmpty(doctor.user)) {
                    isNew = true;
                } else {
                    isNew = false;
                    user_payload['_id'] = doctor.user;
                }
                user_payload['type'] = 'doctors';
                payload['user'] = await userService.upsertUser(user_payload, isNew);
            }

            payload['nurse'] = payload.nurse ? payload.nurse : null;
            payload = Object.assign(doctor, payload);
            const result = await doctorService.upsertDoctor(payload, false);

            if (get(result, 'nurse') && get(result, '_id')) {
                await doctorService.updateDoctorToNurse(result);
            }

            return result;
        } catch (err) {
            console.log('Data Not Update', {err});
            throw err;
        }
    }

    static async delete(id) {
        return await doctorService.deleteDoctorById(id);
    }
}

module.exports = DoctorController;