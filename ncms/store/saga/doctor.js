import { call, put, takeEvery } from 'redux-saga/effects';
import {getResponse, GET_DATA, getDoctors, DELETE_DATA} from './../actions';
import api from './../api';

export function* fetchData(action) {
    try {
        const data = yield call(api.getDoctors, action.payload);
        yield put(getDoctors(data));
    } catch(err) {
        console.log(JSON.stringify(err));
        yield put(getResponse(err));
    }
}

export function* removeData(action) {
    try {
        yield put(getResponse(null));
        const data = yield call(api.deleteDoctor, action.id);
        yield put(getResponse(data));
    } catch(err) {
        console.log(JSON.stringify(err));
        yield put(getResponse(err));
    }
}

export default function* sagaWorker() {
    yield takeEvery(GET_DATA, fetchData);
    yield takeEvery(DELETE_DATA, removeData);
}
