const settingsService = require('./../services/settings.service');
const List = require('./../lib/list');
const {isEmpty} = require('lodash');

class SettingsController {

    static async index(filter) {
        const settings = await settingsService.getSettings(filter);
        return settings;
    }

    // static async update(payload) {
    //     try {
    //         const employee = await userService.getEmployeeById(payload._id);
    //         if (!employee) {
    //             throw new ValidationError('User not found', {}, 404);
    //         }
    //
    //         const user_payload = {};
    //         if (!isEmpty(payload.username)) {
    //             user_payload['username'] = payload.username;
    //         }
    //
    //         if (!isEmpty(payload.password)) {
    //             user_payload['password'] = payload.password;
    //         }
    //
    //         if (!isEmpty(user_payload)) {
    //             let isNew;
    //             if (isEmpty(employee.user)) {
    //                 isNew = true;
    //             } else {
    //                 isNew = false;
    //                 user_payload['_id'] = employee.user;
    //             }
    //             user_payload['type'] = 'employees';
    //             payload['user'] = await userService.upsertUser(user_payload, isNew);
    //         }
    //
    //         payload = Object.assign(employee, payload);
    //         return await userService.upsertEmployee(payload, false);
    //     } catch (err) {
    //         console.log('Data Not Store', {err});
    //         throw err;
    //     }
    // }


}

module.exports = SettingsController;