
const {isArray, get} = require('lodash');
const PatientNurseCall = require('./../models/patient_nurse_call.modal');

module.exports = class NurseCallReport {

    constructor(defaultColumns = {}, filters = {}) {
        this.defaultColumns = defaultColumns;
        this.filters = filters;
    }

    static init(report_type, filters) {
        let defaultColumns = {};
        switch(report_type) {
            case 'daily_date_wise_report':
                defaultColumns = {
                    date: 'Date',
                    call: 'Call',
                    miss: 'Miss',
                    receive: 'Receive',
                    present: 'Present',
                    emergency: 'Emergency',
                    complete: 'Complete'
                };
                break;
            case 'daily_nurse_wise_report':
                defaultColumns = {
                    nurse: 'Nurse',
                    total_call: 'T.Call',
                    total_miss: 'T.Miss',
                    total_receive: 'T.Receive',
                    receive: 'Receive',
                    present: 'Present',
                    emergency: 'Emergency',
                    complete: 'Complete',
                };
                break;
            case 'monthly_date_wise_report':
                defaultColumns = {
                    date: 'Date',
                    call: 'Call',
                    miss: 'Miss',
                    receive: 'Receive',
                    present: 'Present',
                    emergency: 'Emergency',
                    complete: 'Complete'
                };
                break;
            case 'monthly_nurse_wise_report':
                defaultColumns = {
                    nurse: 'Nurse',
                    total_call: 'T.Call',
                    total_miss: 'T.Miss',
                    total_receive: 'T.Receive',
                    receive: 'Receive',
                    present: 'Present',
                    emergency: 'Emergency',
                    complete: 'Complete'
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

    async getDailyDateWisePatientNurseCallSummary() {
        return await PatientNurseCall.aggregate()
            .match(this.filters.filter)
            .project({
                created_at: {$dateToString: {format: "%Y-%m-%d", date: "$created_at"}},
                call_value: {$cond: [ {$eq: ["$call", null] }, 0, 1]},
                receive_value: {$cond: [ {$eq: ["$receive", null] }, 0, 1]},
                present_value: {$cond: [ {$eq: ["$present", null] }, 0, 1]},
                emergency_value: {$cond: [ {$eq: ["$emergency", null] }, 0, 1]},
                complete_value: {$cond: [ {$eq: ["$complete", null] }, 0, 1]},
            })
            .group({
                _id: '$created_at',
                call: {$sum: "$call_value"},
                receive: {$sum: "$receive_value"},
                present: {$sum: "$present_value"},
                emergency: {$sum: "$emergency_value"},
                complete: {$sum: "$complete_value"},
            })
            .project({
                _id: 0,
                date: '$_id',
                call: 1,
                miss: {$subtract: ['$call', '$receive']},
                // receive: {$concat: [{$toString: '$receive'},' - ', {$toString: {$subtract: ['$call', '$receive']}}]},
                receive: 1,
                present: 1,
                emergency: 1,
                complete: 1
            })
            .sort({'date': 1});
    }

    async getDailyNurseWisePatientNurseCallSummary() {
        let total_call = 0;
        let total_miss = 0;
        let total_receive = 0;

        const receive = await PatientNurseCall.aggregate()
            .match({...this.filters.filter, receive: {$ne: null}})
            .count('total')
            .exec();

        if (isArray(receive)) {
            total_receive = get(receive, '[0].total', 0);
        } else if (receive) {
            total_receive = get(receive, 'total', 0);
        }

        const miss = await PatientNurseCall.aggregate()
            .match({...this.filters.filter, receive: {$eq: null}})
            .count('total')
            .exec();

        if (isArray(miss)) {
            total_miss = get(miss, '[0].total', 0);
        } else if (miss){
            total_miss = get(miss, 'total', 0);
        }
        total_call = total_receive + total_miss;

        return await PatientNurseCall.aggregate()
            .match({...this.filters.filter, nurse: {$ne: null}})
            .project({
                nurse: 1,
                created_at: {$dateToString: {format: "%Y-%m-%d", date: "$created_at"}},
                call_value: {$cond: [ {$eq: ["$call", null] }, 0, 1]},
                receive_value: {$cond: [ {$eq: ["$receive", null] }, 0, 1]},
                present_value: {$cond: [ {$eq: ["$present", null] }, 0, 1]},
                emergency_value: {$cond: [ {$eq: ["$emergency", null] }, 0, 1]},
                complete_value: {$cond: [ {$eq: ["$complete", null] }, 0, 1]},
                total_call: {$add: [total_call, 0]},
                total_miss: {$add: [total_miss, 0]},
                total_receive: {$add: [total_receive, 0]},
            })
            .group({
                _id: '$nurse._id',
                nurse: {$first: "$nurse.name"},
                call: {$sum: "$call_value"},
                receive: {$sum: "$receive_value"},
                present: {$sum: "$present_value"},
                emergency: {$sum: "$emergency_value"},
                complete: {$sum: "$complete_value"},
                total_call: {$first: "$total_call"},
                total_miss: {$first: "$total_miss"},
                total_receive: {$first: "$total_receive"},
            })
            .project({
                _id: 1,
                nurse: 1,
                total_call: 1,
                total_miss: 1,
                total_receive: 1,
                receive: 1,
                present: 1,
                emergency: 1,
                complete: 1,
            })
            .sort({'receive': -1})
            .exec();
    }

    async getMonthlyDateWisePatientNurseCallSummary() {
        return await PatientNurseCall.aggregate()
            .match(this.filters.filter)
            .project({
                nurse: 1,
                created_at: {$dateToString: {format: "%Y-%m-%d", date: "$created_at"}},
                date: {$dateToString: {format: "%Y-%m", date: "$created_at"}},
                call_value: {$cond: [ {$eq: ["$call", null] }, 0, 1]},
                receive_value: {$cond: [ {$eq: ["$receive", null] }, 0, 1]},
                present_value: {$cond: [ {$eq: ["$present", null] }, 0, 1]},
                emergency_value: {$cond: [ {$eq: ["$emergency", null] }, 0, 1]},
                complete_value: {$cond: [ {$eq: ["$complete", null] }, 0, 1]},
            })
            .group({
                _id: '$date',
                date: {$first: "$date"},
                call: {$sum: "$call_value"},
                receive: {$sum: "$receive_value"},
                present: {$sum: "$present_value"},
                emergency: {$sum: "$emergency_value"},
                complete: {$sum: "$complete_value"},
            })
            .project({
                _id: 1,
                date: 1,
                call: 1,
                miss: {$subtract: ['$call', '$receive']},
                receive: 1,
                present: 1,
                emergency: 1,
                complete: 1
            })
            .sort({"_id": 1})
            .exec();
    }

    async getMonthlyNurseWisePatientNurseCallSummary() {
        let total_call = 0;
        let total_miss = 0;
        let total_receive = 0;

        const receive = await PatientNurseCall.aggregate()
            .match({...this.filters.filter, receive: {$ne: null}})
            .count('total')
            .exec();

        if (isArray(receive)) {
            total_receive = get(receive, '[0].total', 0);
        } else if (receive) {
            total_receive = get(receive, 'total', 0);
        }

        const miss = await PatientNurseCall.aggregate()
            .match({...this.filters.filter, receive: {$eq: null}})
            .count('total')
            .exec();

        if (isArray(miss)) {
            total_miss = get(miss, '[0].total', 0);
        } else if (miss){
            total_miss = get(miss, 'total', 0);
        }
        total_call = total_receive + total_miss;

        return await PatientNurseCall.aggregate()
            .match({...this.filters.filter, nurse: {$ne: null}})
            .project({
                nurse: 1,
                created_at: {$dateToString: {format: "%Y-%m-%d", date: "$created_at"}},
                call_value: {$cond: [ {$eq: ["$call", null] }, 0, 1]},
                receive_value: {$cond: [ {$eq: ["$receive", null] }, 0, 1]},
                present_value: {$cond: [ {$eq: ["$present", null] }, 0, 1]},
                emergency_value: {$cond: [ {$eq: ["$emergency", null] }, 0, 1]},
                complete_value: {$cond: [ {$eq: ["$complete", null] }, 0, 1]},
                total_call: {$add: [total_call, 0]},
                total_miss: {$add: [total_miss, 0]},
                total_receive: {$add: [total_receive, 0]},
            })
            .group({
                _id: '$nurse._id',
                nurse: {$first: "$nurse.name"},
                call: {$sum: "$call_value"},
                receive: {$sum: "$receive_value"},
                present: {$sum: "$present_value"},
                emergency: {$sum: "$emergency_value"},
                complete: {$sum: "$complete_value"},
                total_call: {$first: "$total_call"},
                total_miss: {$first: "$total_miss"},
                total_receive: {$first: "$total_receive"},
            })
            .project({
                _id: 1,
                nurse: 1,
                total_call: 1,
                total_miss: 1,
                total_receive: 1,
                receive: 1,
                present: 1,
                emergency: 1,
                complete: 1,
            })
            .sort({'receive': -1})
            .exec();
    }


    // async getMonthlyPatientNurseCallSummary() {
    //     return await PatientNurseCall.aggregate()
    //         .match(this.filters.filter)
    //         .project({
    //             nurse: 1,
    //             created_at: {$dateToString: {format: "%Y-%m-%d", date: "$created_at"}},
    //             date: {$dateToString: {format: "%Y-%m", date: "$created_at"}},
    //             call_value: {$cond: [ {$eq: ["$call", null] }, 0, 1]},
    //             receive_value: {$cond: [ {$eq: ["$receive", null] }, 0, 1]},
    //             present_value: {$cond: [ {$eq: ["$present", null] }, 0, 1]},
    //             emergency_value: {$cond: [ {$eq: ["$emergency", null] }, 0, 1]},
    //             complete_value: {$cond: [ {$eq: ["$complete", null] }, 0, 1]},
    //         })
    //         .group({
    //             _id: '$nurse.name',
    //             nurse: {$first: "$nurse.name"},
    //             date: {$first: "$date"},
    //             call: {$sum: "$call_value"},
    //             receive: {$sum: "$receive_value"},
    //             present: {$sum: "$present_value"},
    //             emergency: {$sum: "$emergency_value"},
    //             complete: {$sum: "$complete_value"},
    //         })
    //         .project({_id: 1, nurse: 1, date: 1, call: 1, receive: 1, present: 1, emergency: 1, complete: 1})
    //         .sort({"_id": 1})
    //         .exec();
    //     // .exec((err, results) => {
    //     //     reduce(results, (miss_call, result) => {if (result.nurse === null) })
    //     // });
    // }
};