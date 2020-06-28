import {GET_RESPONSE, GET_D_P_N_C_RESULT, GET_M_P_N_C_RESULT} from './../actions/actionTypes';

const initialState = {
    data: null,
    response: null,
    columns: '',
    ...window.locals,
};

export const dailyPatientNurseCall = (state = initialState, action) => {
    if (action.type === GET_RESPONSE) {
        return {...state, response: action.response};
    }

    if (action.type === GET_D_P_N_C_RESULT) {
        if (action.payload.status === 'error') {
            return {...state, response: action.payload};
        }
        return {...state, data: action.payload.results};
    }

    return state;
};

export const monthlyPatientNurseCall = (state = initialState, action) => {
    if (action.type === GET_RESPONSE) {
        return {...state, response: action.response};
    }

    if (action.type === GET_M_P_N_C_RESULT) {
        if (action.payload.status === 'error') {
            return {...state, response: action.payload};
        }
        return {...state, data: action.payload.results};
    }

    return state;
};