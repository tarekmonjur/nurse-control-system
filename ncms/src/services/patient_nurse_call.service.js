const Validator = require('./../lib/validator');
const ValidationError = require('./../lib/validationError');
const PatientNurseCall = require('./../models/patient_nurse_call.modal');

module.exports = {
    defaultColumns: {
        nurse: 'Nurse Name',
        patient: 'Patient Name',
        bed: 'Bed Info',
        date: 'Call Date',
        call: 'Calling',
        receive: 'Received',
        present: 'Present',
        emergency: 'Emergency',
        complete: 'Received',
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

    async getAllCallHistories(filters = {filter: {}}) {
        return await PatientNurseCall.find(filters.filter, filters.select).sort({created_at: -1});
    },

    async getNurseById(id) {
        return await PatientNurseCall.findById(id);
    },

    async deleteNurseById(id) {
        return await PatientNurseCall.deleteOne({_id: id});
    },

    async upsertNurse(payload, isNew = true) {
        const nurse = new PatientNurseCall(payload);
        const error = nurse.validateSync();
        if (error && error.errors) {
            throw new ValidationError('Nurse fields error', error.errors);
        }
        nurse.isNew = isNew;
        return await nurse.save();
    }
};