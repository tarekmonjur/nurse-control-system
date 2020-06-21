import { call, put, takeEvery } from 'redux-saga/effects';
import {getResponse, GET_DATA, getCallHistories} from './../actions';
import api from './../api';

export function* fetchData(action) {
    try {
        const data = yield call(api.getCallHistories, action.payload);
        yield put(getCallHistories(data));
    } catch(err) {
        console.log(JSON.stringify(err));
        yield put(getResponse(err));
    }
}

export default function* sagaWorker() {
    yield takeEvery(GET_DATA, fetchData);
}
