import {GET_RESPONSE, GET_SETTINGS} from './../actions/actionTypes';

const initialState = {
    data: null,
    response: null,
    columns: '',
    ...window.locals,
};

export const settings = (state = initialState, action) => {
    if (action.type === GET_RESPONSE) {
        return {...state, response: action.response};
    }

    if (action.type === GET_SETTINGS) {
        if (action.payload.status === 'error') {
            return {...state, response: action.payload};
        }
        return {...state, data: action.payload.results};
    }

    return state;
};