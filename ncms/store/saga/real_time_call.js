import { call, put, takeEvery } from 'redux-saga/effects';
import {getResponse, GET_DATA, getRealTimeCall} from './../actions';
import api from './../api';

export function* fetchData(action) {
    try {
        const data = yield call(api.getRealTimeCall, action.payload);
        yield put(getRealTimeCall(data));
    } catch(err) {
        console.log(JSON.stringify(err));
        yield put(getResponse(err));
    }
}

export default function* sagaWorker() {
    yield takeEvery(GET_DATA, fetchData);
}
