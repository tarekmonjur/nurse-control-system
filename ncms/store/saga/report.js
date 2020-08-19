import { call, put, takeEvery, take, fork } from 'redux-saga/effects';
import {
    GET_D_DW_P_N_C, GET_D_NW_P_N_C,
    GET_M_DW_P_N_C, GET_M_NW_P_N_C,
    getDailyDateWisePatientNurseCallResult, getDailyNurseWisePatientNurseCallResult,
    getMonthlyDateWisePatientNurseCallResult, getMonthlyNurseWisePatientNurseCallResult,
    getResponse,
} from './../actions';
import api from './../api';

export function* fetchDailyDateWisePatientNurseCall(action) {
    try {
        const data = yield call(api.getDailyDateWisePatientNurseCall, action.payload);
        yield put(getDailyDateWisePatientNurseCallResult(data));
    } catch(err) {
        console.log(JSON.stringify(err));
        yield put(getResponse(err));
    }
}

export function* fetchDailyNurseWisePatientNurseCall(action) {
    try {
        const data = yield call(api.getDailyNurseWisePatientNurseCall, action.payload);
        yield put(getDailyNurseWisePatientNurseCallResult(data));
    } catch(err) {
        console.log(JSON.stringify(err));
        yield put(getResponse(err));
    }
}

export function* fetchMonthlyDateWisePatientNurseCall(action) {
    try {
        const data = yield call(api.getMonthlyDateWisePatientNurseCall, action.payload);
        yield put(getMonthlyDateWisePatientNurseCallResult(data));
    } catch(err) {
        console.log(JSON.stringify(err));
        yield put(getResponse(err));
    }
}

export function* fetchMonthlyNurseWisePatientNurseCall(action) {
    try {
        const data = yield call(api.getMonthlyNurseWisePatientNurseCall, action.payload);
        yield put(getMonthlyNurseWisePatientNurseCallResult(data));
    } catch(err) {
        console.log(JSON.stringify(err));
        yield put(getResponse(err));
    }
}


// worker
export function* sagaDailyReportWorker() {
    while(true) {
        const action = yield take(GET_D_DW_P_N_C);
        yield fork(fetchDailyDateWisePatientNurseCall, action);

        const action2 = yield take(GET_D_NW_P_N_C);
        yield fork(fetchDailyNurseWisePatientNurseCall, action2);
    }
}

// worker
export function* sagaMonthlyReportWorker() {
    while(true) {
        const action = yield take(GET_M_DW_P_N_C);
        yield fork(fetchMonthlyDateWisePatientNurseCall, action);

        const action2 = yield take(GET_M_NW_P_N_C);
        yield fork(fetchMonthlyNurseWisePatientNurseCall, action2);
    }
}
