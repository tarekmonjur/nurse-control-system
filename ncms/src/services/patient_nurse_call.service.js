
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
};