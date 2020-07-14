
const PatientNurseCall = require('./../models/patient_nurse_call.modal');

module.exports = class NurseCallReport {

    constructor(defaultColumns = {}, filters = {}) {
        this.defaultColumns = defaultColumns;
        this.filters = filters;
    }

    static init(report_type, filters) {
        let defaultColumns = {};
        switch(report_type) {
            case 'daily_report':
                defaultColumns = {
                    date: 'Date',
                    call: 'Calling',
                    receive: 'Receive',
                    present: 'Present',
                    emergency: 'Emergency',
                    complete: 'Completed'
                };
                break;
            case 'monthly_report':
                defaultColumns = {
                    nurse: 'Nurse Name',
                    receive: 'Receive',
                    present: 'Present',
                    emergency: 'Emergency',
                    complete: 'Completed'
                };
                break;
        }

        const report = new NurseCallReport(defaultColumns, filters);
        report.filters = report.makeFilters(filters);
        return report;
    }

    getFields() {
        let columns = {};
        Object.keys(this.defaultColumns).filter((key) => {
            columns[key] = '';
        });
        return columns;
    }

    getColumns(select) {
        let columns = {};
        select = select.split(',');
        Object.keys(this.defaultColumns).filter((key) => {
            if (select.includes(key)) {
                columns[key] = this.defaultColumns[key];
            }
        });
        return columns;
    }

    makeFilters(filters) {
        const actions = filters.actions || [];
        let select = filters.columns || '';
        let columns = this.defaultColumns;

        if (select) {
            columns = this.getColumns(select);
            select = select.replace(',', ' ');
        }

        const column = Object.keys(columns).join(',');
        return {
            filter: filters.filter,
            page: filters.page || 1,
            limit: filters.limit || 25,
            select,
            column,
            columns,
            actions
        };
    }

    async getDailyPatientNurseCallSummary() {
        return await PatientNurseCall.find(this.filters.filter, this.filters.select).sort({created_at: -1});
    }

    async getMonthlyPatientNurseCallSummary() {
        return await PatientNurseCall.find(this.filters.filter, this.filters.select).sort({created_at: -1});
    }
};