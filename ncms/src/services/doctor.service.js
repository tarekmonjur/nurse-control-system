const Validator = require('./../lib/validator');
const ValidationError = require('./../lib/validationError');
const Doctor = require('./../models/doctor.modal');

module.exports = {
    defaultColumns: {
        name: 'Doctor Name',
        mobile_no: 'Mobile No',
        department: 'Department',
        designation: 'Designation',
        gender: 'Gender',
        assistant: 'Assistant',
        joining: 'Joining',
        address: 'Address',
    },

    makePayload(data) {
        const payload = Object.assign(this.getFields(), data);
        return payload;
    },

    handleValidate(data) {
        const rules = {
            name: 'require|min:3|max:20',
            department: 'min:3|max:50',
            designation: 'min:3|max:50',
            mobile_no: 'require|mobile:bn-BD',
            address: 'max:255',
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
        return await Doctor.find(filters.filter, filters.select).sort({created_at: -1});
    },

    async getDoctorById(id) {
        return await Doctor.findById(id);
    },

    async deleteDoctorById(id) {
        return await Doctor.deleteOne({_id: id});
    },

    async upsertDoctor(payload, isNew = true) {
        const doctor = new Doctor(payload);
        const error = doctor.validateSync();
        if (error && error.errors) {
            throw new ValidationError('Doctor fields error', error.errors);
        }
        doctor.isNew = isNew;
        return await doctor.save();
    }
};