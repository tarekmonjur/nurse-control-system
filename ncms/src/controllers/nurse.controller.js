const ValidationError = require('../lib/validationError');
const nurseService = require('./../services/nurse.service');
const userService = require('./../services/user.service');
const List = require('./../lib/list');
const {isEmpty} = require('lodash');

class NurseController {

    static async index(filter) {
        const nurses = await nurseService.getAllNurses(filter);
        const list = new List(filter, nurses).generate();
        return list
    }

    static async store(payload) {
        try {
            if (!isEmpty(payload.username) && !isEmpty(payload.password)) {
                payload['type'] = 'nurses';
                payload['user'] = await userService.upsertUser(payload);
            }
            payload['group'] = await userService.getGroupByName('Nurse');
            return await nurseService.upsertNurse(payload);
        } catch (err) {
            console.log('Data Not Store', {err});
            throw err;
        }
    }

    static async view(id) {
        return await nurseService.getNurseById(id);
    }

    static async update(payload) {
        try {
            const nurse = await nurseService.getNurseById(payload._id);
            if (!nurse) {
                throw new ValidationError('Nurse not found', {}, 404);
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
                if (isEmpty(nurse.user)) {
                    isNew = true;
                } else {
                    isNew = false;
                    user_payload['_id'] = nurse.user;
                }
                user_payload['type'] = 'nurses';
                payload['user'] = await userService.upsertUser(user_payload, isNew);
            }

            payload = Object.assign(nurse, payload);
            return await nurseService.upsertNurse(payload, false);
        } catch (err) {
            console.log('Data Not Store', {err});
            throw err;
        }
    }

    static async delete(id) {
        return await nurseService.deleteNurseById(id);
    }
}

module.exports = NurseController;