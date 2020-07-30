const Validator = require('./../lib/validator');
const ValidationError = require('./../lib/validationError');
const UserGroup = require('./../models/user_group.model');
const User = require('./../models/user.model');
const Employee = require('./../models/employee.model');
const {isEmpty} = require('lodash');

module.exports = {
    defaultColumns: {
        name: 'Name',
        ['group.name']: 'Group',
        department: 'Department',
        designation: 'Designation',
        mobile_no: 'Mobile No',
        email: 'Email',
        gender: 'Gender',
        joining: 'Joining',
        address: 'Address',
    },

    getFields() {
        let fields = {};
        Object.keys(this.defaultColumns).filter((key) => {
            fields[key] = '';
        });
        return fields;
    },

    makePayload(data) {
        const payload = Object.assign(this.getFields(),{
            username: '',
            password: '',
            confirm_password: '',
        }, data);
        return payload;
    },

    handleValidate(data) {
        const rules = {
            name: 'require|min:3|max:50',
            group: 'require',
            department: 'max:50',
            designation: 'max:50',
            email: 'email|max:100',
            mobile_no: 'require|mobile:bn-BD',
            address: 'max:255',
            username: 'min:3|max:20',
            password: 'min:6|max:20',
            confirm_password: 'equal:password',
        };

        const payload = this.makePayload(data);
        const validate = new Validator(payload, rules);
        return validate.getErrors();
    },

    getColumns(select) {
        let columns = {};
        select = select.split(',');
        Object.keys(this.defaultColumns).filter((key) => {
            if (select.includes(key)) {
                columns[key] = this.defaultColumns[key];
            }
        });
        return columns;
    },

    makeFilter(req) {
        const actions = req.user ? req.user.actions || [] : [];
        let select = req.query.columns || '';
        let columns = this.defaultColumns;

        if (select) {
            columns = this.getColumns(select);
            select = select.replace(',', ' ');
        }

        const column = Object.keys(columns).join(',');
        return {
            filters: {
            },
            page: req.params.page || 1,
            limit: req.params.limit || 25,
            select,
            column,
            columns,
            actions
        };
    },

    async getUsers(filters = {filter: {}}) {
        return await Employee.find(filters.filter, filters.select)
            .sort({created_at: -1})
            .populate('user', '-password')
            .populate('group');
    },

    async getUserGroups() {
        return await UserGroup.find({});
    },

    async getGroupByName(name) {
        return await UserGroup.findOne({name});
    },

    async upsertUser(payload, isNew = true) {
        const user = new User(payload);
        const error = user.validateSync();
        if (error && error.errors) {
            throw new ValidationError('User fields error', error.errors);
        }
        user.isNew = isNew;
        return await user.save();
    },

    async upsertEmployee(payload, isNew = true) {
        const employee = new Employee(payload);
        const error = employee.validateSync();
        if (error && error.errors) {
            throw new ValidationError('Employee fields error', error.errors);
        }
        employee.isNew = isNew;
        return await employee.save();
    },

    async getEmployeeById(id) {
        return await Employee.findById(id, '-id');
    },

    async deleteUserById(id) {
        const employee = await Employee.findById(id, '-id');
        await Employee.deleteOne({_id: id});
        return await User.deleteOne({_id: employee.user});
    },
};