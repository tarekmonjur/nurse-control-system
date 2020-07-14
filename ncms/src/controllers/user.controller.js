const userService = require('./../services/user.service');
const List = require('./../lib/list');
const {isEmpty} = require('lodash');

class UserController {

    static async index(filter) {
        const users = await userService.getUsers(filter);
        const list = new List(filter, users).generate();
        return list;
    }

    static async store(payload) {
        try {
            console.debug('payload', JSON.stringify(payload));
            payload['type'] = 'employees';
            const user = await userService.upsertUser(payload);
            payload['user'] = user;
            // const {name, group, user: {id: user_id}, email, department, designation, mobile_no, joining, gender, address} = payload;
            return await userService.upsertEmployee(payload);
        } catch (err) {
            console.log('Data Not Store', {err});
            throw err;
        }
    }

    static async view(id) {
        return await userService.getEmployeeById(id);
    }

    static async update(payload) {
        try {
            console.debug('payload', JSON.stringify(payload));

            let employee_payload = payload;
            const employee = await userService.getEmployeeById(payload._id);
            if (!employee) {
                throw new ValidationError('User not found', {}, 404);
            }
            employee_payload = Object.assign(employee, employee_payload);
            await userService.upsertEmployee(employee_payload, false);

            const user_payload = {};
            if (!isEmpty(payload.username)) {
                user_payload['username'] = payload.username;
            }
            if (!isEmpty(payload.password)) {
                user_payload['password'] = payload.password;
            }
            if (!isEmpty(user_payload)) {
                user_payload['_id'] = employee.user;
                await userService.upsertUser(user_payload, false);
            }
        } catch (err) {
            console.log('Data Not Store', {err});
            throw err;
        }
    }

    static async delete(id) {
        return await userService.deleteUserById(id);
    }


}

module.exports = UserController;