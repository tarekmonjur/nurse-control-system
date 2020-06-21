const ValidationError = require('../lib/validationError');
const bedService = require('./../services/bed.service');
const List = require('./../lib/list');

class BedController {
    static async index(filter) {
        const beds = await bedService.getAllBeds(filter);
        const list = new List(filter, beds).generate();
        return list
    }

    static async store(payload) {
        return await bedService.upsertBed(payload);
    }

    static async view(id) {
        return await bedService.getBedById(id);
    }

    static async update(payload) {
        const bed = await bedService.getBedById(payload._id);
        if (!bed) {
            throw new ValidationError('Bed not found', {}, 404);
        }
        payload = Object.assign(bed, payload);
        return await bedService.upsertBed(payload, false);
    }

    static async delete(id) {
        return await bedService.deleteBedById(id);
    }
}

module.exports = BedController;