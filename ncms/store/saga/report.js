import { call, put, takeEvery, take, fork } from 'redux-saga/effects';
import {
    GET_D_P_N_C, GET_M_P_N_C,
    getResponse, getDailyPatientNurseCallResult, getMonthlyPatientNurseCallResult,
} from './../actions';
import api from './../api';

export function* fetchDailyPatientNurseCallData(action) {
    try {
        const data = yield call(api.getDailyPatientNurseCall, action.payload);
        yield put(getDailyPatientNurseCallResult(data));
    } catch(err) {
        console.log(JSON.stringify(err));
        yield put(getResponse(err));
    }
}

export function* fetchMonthlyPatientNurseCallData(action) {
    try {
        const data = yield call(api.getMonthlyPatientNurseCall, action.payload);
        yield put(getMonthlyPatientNurseCallResult(data));
    } catch(err) {
        console.log(JSON.stringify(err));
        yield put(getResponse(err));
    }
}

export default function* sagaWorker() {
    while(true) {
        const action = yield take(GET_D_P_N_C);
        yield fork(fetchDailyPatientNurseCallData, action);

        const action2 = yield take(GET_M_P_N_C);
        yield fork(fetchMonthlyPatientNurseCallData, action2);
    }
}
