const Validator = require('./../lib/validator');
const ValidationError = require('./../lib/validationError');
const { Nurse } = require('./../models/nurse.modal');
const { Doctor } = require('./../models/doctor.modal');
const User = require('./../models/user.model');
const {isEmpty, unset} = require('lodash');

module.exports = {
    defaultColumns: {
        name: 'Nurse Name',
        department: 'Department',
        designation: 'Designation',
        mobile_no: 'Mobile No',
        email: 'Email',
        gender: 'Gender',
        ['doctors[*].name']: 'Assist to Doctors',
        joining: 'Joining',
        address: 'Address',
    },

    makePayload(data) {
        const payload = Object.assign(this.getFields(), {
            username: '',
            password: '',
            confirm_password: '',
        }, data);
        return payload;
    },

    handleValidate(data) {
        const rules = {
            name: 'require|min:3|max:20',
            email: 'email|max:100',
            department: 'min:3|max:50',
            designation: 'min:3|max:50',
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

    getFields() {
        let columns = {};
        Object.keys(this.defaultColumns).filter((key) => {
            columns[key] = '';
        });
        return columns;
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
        const actions = req.user.actions || [];
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

    async getAllNurses(filters = {filter: {}}) {
        return await Nurse.find(filters.filter, filters.select).sort({created_at: -1});
    },

    async getAllDcotors(filters = {}) {
        return await Doctor.find(filters.filter, filters.select).sort({created_at: -1});
    },

    async getNurseById(id) {
        return await Nurse.findById(id);
    },

    async deleteNurseById(id) {
        const nurse = await Nurse.findById(id);
        await Nurse.deleteOne({_id: id});
        return await User.deleteOne({_id: nurse.user});
    },

    async upsertNurse(payload, isNew = true) {
        if (isEmpty(payload.doctors)) {
            unset(payload, 'doctors')
        }

        const nurse = new Nurse(payload);
        const error = nurse.validateSync();

        if (error && error.errors) {
            throw new ValidationError('Nurse fields error', error.errors);
        }

        nurse.isNew = isNew;
        return await nurse.save();
    }
};