const API_PREFIX = '/api';
const PATIENT_URL = '/patients';
const BED_URL = '/beds';
const DOCTOR_URL = '/doctors';
const NURSE_URL = '/nurses';
const CALL_HISTORY_URL = '/call-histories';
const REAL_TIME_CALL_URL = '/real-time-call';
const REPORT_URL = '/reports';
const USER_URL = '/users';

async function makeRequest(url, method = 'GET', payload = null, headers = null) {
    url = `${API_PREFIX}${url}`;
    method = method.toUpperCase();

    const request = {
        method: method,
        headers: headers ? headers : {
            'Content-Type': 'application/json',
        },
        json: true,
    };

    if (method === 'GET' && payload) {
        const query = new URLSearchParams(payload);
        url = `${url}/?${query.toString()}`
    }

    if (method === 'POST' || method === 'PUT') {
        request.body = JSON.stringify(payload);
    }

    try {
        const response = await fetch(url, request);
        try {
            return response.json();
        } catch (err) {
            return {
                code: response.status,
                status: 'error',
                message: response.message || `API: ${response.statusText}`,
                error: response.statusText
            }
        }
    } catch (err) {
        console.log('error : ', {err});
    }
}

module.exports = {

    /********PATIENT API**********/
    async getPatients(payload = {}) {
        return await makeRequest(
            PATIENT_URL,
            'get',
            payload);
    },

    async storePatient(payload) {
        return await makeRequest(
            PATIENT_URL,
            'post',
            payload);
    },

    async showPatient(id) {
        return await makeRequest(
            `${PATIENT_URL}/${id}`,
            'get');
    },

    async updatePatient(id, payload) {
        return await makeRequest(
            `${PATIENT_URL}/${id}`,
            'put',
            payload);
    },

    async deletePatient(id) {
        return await makeRequest(
            `${PATIENT_URL}/${id}`,
            'delete');
    },

    /********BED API**********/
    async getBeds(payload = {}) {
        return await makeRequest(
            BED_URL,
            'get',
            payload);
    },

    async storeBed(payload) {
        return await makeRequest(
            BED_URL,
            'post',
            payload);
    },

    async showBed(id) {
        return await makeRequest(
            `${BED_URL}/${id}`,
            'get');
    },

    async updateBed(id, payload) {
        return await makeRequest(
            `${BED_URL}/${id}`,
            'put',
            payload);
    },

    async deleteBed(id) {
        return await makeRequest(
            `${BED_URL}/${id}`,
            'delete');
    },

    /********DOCTOR API**********/
    async getDoctors(payload = {}) {
        return await makeRequest(
            DOCTOR_URL,
            'get',
            payload);
    },

    async storeDoctor(payload) {
        return await makeRequest(
            DOCTOR_URL,
            'post',
            payload);
    },

    async showDoctor(id) {
        return await makeRequest(
            `${DOCTOR_URL}/${id}`,
            'get');
    },

    async updateDoctor(id, payload) {
        return await makeRequest(
            `${DOCTOR_URL}/${id}`,
            'put',
            payload);
    },

    async deleteDoctor(id) {
        return await makeRequest(
            `${DOCTOR_URL}/${id}`,
            'delete');
    },

    /********NURSE API**********/
    async getNurses(payload = {}) {
        return await makeRequest(
            NURSE_URL,
            'get',
            payload);
    },

    async storeNurse(payload) {
        return await makeRequest(
            NURSE_URL,
            'post',
            payload);
    },

    async showNurse(id) {
        return await makeRequest(
            `${NURSE_URL}/${id}`,
            'get');
    },

    async updateNurse(id, payload) {
        return await makeRequest(
            `${NURSE_URL}/${id}`,
            'put',
            payload);
    },

    async deleteNurse(id) {
        return await makeRequest(
            `${NURSE_URL}/${id}`,
            'delete');
    },

    /********CALL HISTORY API**********/
    async getCallHistories(payload = {}) {
        return await makeRequest(
            CALL_HISTORY_URL,
            'get',
            payload);
    },

    /********REAL TIME CALL API**********/
    async getRealTimeCall(payload = {}) {
        return await makeRequest(
            REAL_TIME_CALL_URL,
            'get',
            payload);
    },

    /********REPORT CALL API**********/
    async getDailyPatientNurseCall(payload = {}) {
        return await makeRequest(
            `${REPORT_URL}/daily-patient-nurse-call-summary`,
            'get',
            payload);
    },

    async getMonthlyPatientNurseCall(payload = {}) {
        return await makeRequest(
            `${REPORT_URL}/monthly-patient-nurse-call-summary`,
            'get',
            payload);
    },

    /********USER API**********/
    async getUsers(payload = {}) {
        return await makeRequest(
            USER_URL,
            'get',
            payload);
    },

    async storeUser(payload) {
        return await makeRequest(
            USER_URL,
            'post',
            payload);
    },

    async showUser(id) {
        return await makeRequest(
            `${USER_URL}/${id}`,
            'get');
    },

    async updateUser(id, payload) {
        return await makeRequest(
            `${USER_URL}/${id}`,
            'put',
            payload);
    },

    async deleteUser(id) {
        return await makeRequest(
            `${USER_URL}/${id}`,
            'delete');
    },
};
