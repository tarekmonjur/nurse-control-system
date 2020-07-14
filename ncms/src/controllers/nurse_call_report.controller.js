
const NurseCallReportService = require('./../services/nurse_call_report.service');
const List = require('./../lib/list');

class NurseCallReportController {
    static async dailyPatientNurseCallReport(filters) {
        const Report = NurseCallReportService.init('daily_report', filters);
        const daily_call_summary = await Report.getDailyPatientNurseCallSummary();
        console.log(Report);
        const list = new List(Report.filters, daily_call_summary).generate();
        return list;
    }

    static async monthlyPatientNurseCallReport(filters) {
        const Report = NurseCallReportService.init('monthly_report', filters);
        const monthly_call_summary = await Report.getMonthlyPatientNurseCallSummary();
        const list = new List(Report.filters, monthly_call_summary).generate();
        return list;
    }
}

module.exports = NurseCallReportController;