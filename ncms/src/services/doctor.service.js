const Validator = require('./../lib/validator');
const ValidationError = require('./../lib/validationError');
const {Doctor} = require('./../models/doctor.modal');
const {Nurse} = require('./../models/nurse.modal');
const {User} = require('./../models/user.model');
const {isEmpty, unset, filter} = require('lodash');

module.exports = {
    defaultColumns: {
        name: 'Doctor Name',
        department: 'Department',
        designation: 'Designation',
        mobile_no: 'Mobile No',
        email: 'Email',
        gender: 'Gender',
        ['nurse.name']: 'Assistant',
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

    async getAllDcotors(filters = {filter: {}}) {
        return await Doctor.find(filters.filter, filters.select)
            .sort({created_at: -1})
            .populate('user', '-password')
            .populate('nurse')
            .populate('group');
    },

    async getAllNurses(filters = {}) {
        return await Nurse.find(filters.filter, filters.select).sort({created_at: -1});
    },

    async getDoctorById(id) {
        return await Doctor.findById(id);
    },

    async deleteDoctorById(id) {
        const doctor = await Doctor.findById(id);
        await Doctor.deleteOne({_id: id});
        return await User.deleteOne({_id: doctor.user});
    },

    async upsertDoctor(payload, isNew = true) {
        if (isEmpty(payload.nurse)) {
            unset(payload, 'nurse')
        }

        const doctor = new Doctor(payload);
        const error = doctor.validateSync();

        if (error && error.errors) {
            throw new ValidationError('Doctor fields error', error.errors);
        }

        doctor.isNew = isNew;
        return await doctor.save();
    },

    async updateDoctorToNurse(doctor) {
        const nurse = await Nurse.findById(doctor.nurse);
        if (nurse && nurse.doctors) {
            console.log(doctor._id);
            const doctors = filter(nurse.doctors, (item) => item._id.toString() !== doctor._id.toString());
            console.log({doctors});
            doctors.push(doctor);
            await Nurse.updateOne({_id: nurse._id}, {doctors: doctors});
        }
    }
};