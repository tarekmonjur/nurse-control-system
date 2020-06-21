const Validator = require('./../lib/validator');
const ValidationError = require('./../lib/validationError');
const Patient = require('./../models/patient.modal');

module.exports = {
    defaultColumns: {
        name: 'Patient Name',
        bed_no: 'Bed No',
        patient_mobile_no: 'Patient Mobile',
        gender: 'Gender',
        guardian_name: 'Guardian',
        guardian_mobile_no: 'Guardian Mobile',
        address: 'Address',
        admitted_date:'Admitted',
    },

    makePayload(data) {
        const payload = Object.assign(this.getFields(), data);
        return payload;
    },

    handleValidate(data) {
        const rules = {
            name: 'require|min:3|max:50',
            bed_no: 'require|min:3|max:10',
            patient_mobile_no: 'mobile:bn-BD',
            guardian_name: 'min:3|max:50',
            guardian_mobile_no: 'mobile:bn-BD',
            address: 'max:255'
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
        console.log(req.user);
        const actions = req.user.actions || [];
        let select = req.query.columns || '';
        let columns = this.defaultColumns;

        if (select) {
            columns = this.getColumns(select);
            select = select.replace(',', ' ');
        }
        const column = Object.keys(columns).join(',');
        // select = Object.keys(columns).join(' ');

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

    async getAllPatients(filters = {filter: {}}) {
        return await Patient.find(filters.filter, filters.select).sort({created_at: -1});
    },

    async getPatientById(id) {
        return await Patient.findById(id);
    },

    async deletePatientById(id) {
        return await Patient.deleteOne({_id: id});
    },

    async upsertPatient(payload, isNew = true) {
        const patient = new Patient(payload);
        const error = patient.validateSync();
        if (error && error.errors) {
            throw new ValidationError('Patient fields error', error.errors);
        }
        patient.isNew = isNew;
        return await patient.save();
    }
};