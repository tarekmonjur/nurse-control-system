
const NurseCallReportService = require('./../services/nurse_call_report.service');
const List = require('./../lib/list');

class NurseCallReportController {

    static async dailyPatientNurseCallReport(report_type, filters) {
        const Report = NurseCallReportService.init(report_type, filters);
        let daily_call_summary = [];

        if (report_type === 'daily_date_wise_report') {
            daily_call_summary = await Report.getDailyDateWisePatientNurseCallSummary();
        }

        if (report_type === 'daily_nurse_wise_report') {
            daily_call_summary = await Report.getDailyNurseWisePatientNurseCallSummary();
        }

        const list = new List(Report.filters, daily_call_summary).generate();
        return list;
    }

    static async monthlyPatientNurseCallReport(report_type, filters) {
        const Report = NurseCallReportService.init(report_type, filters);
        let monthly_call_summary = [];

        if (report_type === 'monthly_date_wise_report') {
            monthly_call_summary = await Report.getMonthlyDateWisePatientNurseCallSummary();
        }

        if (report_type === 'monthly_nurse_wise_report') {
            monthly_call_summary = await Report.getMonthlyNurseWisePatientNurseCallSummary();
        }

        const list = new List(Report.filters, monthly_call_summary).generate();
        return list;
    }
}

module.exports = NurseCallReportController;