import { call, put, takeEvery } from 'redux-saga/effects';
import {getResponse, GET_DATA, getSettings, UPDATE_SETTINGS} from './../actions';
import api from './../api';

export function* fetchData(action) {
    try {
        const data = yield call(api.getSettings, action.payload);
        yield put(getSettings(data));
    } catch(err) {
        console.log(JSON.stringify(err));
        yield put(getResponse(err));
    }
}

export function* updateData(action) {
    try {
        yield put(getResponse(null));
        const data = yield call(api.updateSettings, action.id, action.payload);
        yield put(getResponse(data));
    } catch(err) {
        console.log(JSON.stringify(err));
        yield put(getResponse(err));
    }
}

export default function* sagaWorker() {
    yield takeEvery(GET_DATA, fetchData);
    yield takeEvery(UPDATE_SETTINGS, updateData);
}
