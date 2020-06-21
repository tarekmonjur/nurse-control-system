import {GET_RESPONSE, GET_BED} from './../actions/actionTypes';

const initialState = {
    data: null,
    response: null,
    columns: '',
    ...window.locals,
};

export const beds = (state = initialState, action) => {
    if (action.type === GET_RESPONSE) {
        return {...state, response: action.response};
    }

    if (action.type === GET_BED) {
        if (action.payload.status === 'error') {
            return {...state, response: action.payload};
        }
        return {...state, data: action.payload.results};
    }

    return state;
};