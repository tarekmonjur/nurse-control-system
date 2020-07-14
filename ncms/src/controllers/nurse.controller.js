const ValidationError = require('../lib/validationError');
const nurseService = require('./../services/nurse.service');
const List = require('./../lib/list');

class NurseController {
    static async index(filter) {
        const nurses = await nurseService.getAllNurses(filter);
        const list = new List(filter, nurses).generate();
        return list
    }

    static async store(payload) {
        return await nurseService.upsertNurse(payload);
    }

    static async view(id) {
        return await nurseService.getNurseById(id);
    }

    static async update(payload) {
        const nurse = await nurseService.getNurseById(payload._id);
        if (!nurse) {
            throw new ValidationError('Nurse not found', {}, 404);
        }
        payload = Object.assign(nurse, payload);
        return await nurseService.upsertNurse(payload, false);
    }

    static async delete(id) {
        return await nurseService.deleteNurseById(id);
    }
}

module.exports = NurseController;