import {GET_RESPONSE, GET_SETTINGS, LOADER_START, LOADER_STOP} from './../actions/actionTypes';
import {get, set} from 'lodash';

const initialState = {
    data: null,
    response: null,
    columns: '',
    loading: false,
    ...window.locals,
};

export const settings = (state = initialState, action) => {
    if (action.type === GET_RESPONSE) {
        let result =  {...state, response: action.response, loading: false, data: null};
        if (get(action.response, 'results')) {
            result = {...result, data:  get(action.response, 'results', null)};
        }
        return result;
    }

    if (action.type === GET_SETTINGS) {
        if (action.payload.status === 'error') {
            return {...state, response: action.payload};
        }
        return {...state, data: action.payload.results};
    }

    if (action.type === LOADER_START) {
        return {...state, loading: true};
    }

    if (action.type === LOADER_STOP) {
        return {...state, loading: false};
    }

    return state;
};