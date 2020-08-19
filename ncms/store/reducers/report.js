import {
    GET_RESPONSE,
    GET_D_DW_P_N_C_RESULT,
    GET_D_NW_P_N_C_RESULT,
    GET_M_DW_P_N_C_RESULT,
    GET_M_NW_P_N_C_RESULT
} from './../actions/actionTypes';

const initialState = {
    data: null,
    response: null,
    columns: '',
    ...window.locals,
};

export const dailyDateWisePatientNurseCall = (state = initialState, action) => {
    if (action.type === GET_RESPONSE) {
        return {...state, response: action.response};
    }

    if (action.type === GET_D_DW_P_N_C_RESULT) {
        if (action.payload.status === 'error') {
            return {...state, response: action.payload};
        }
        return {...state, data: action.payload.results};
    }

    return state;
};

export const dailyNurseWisePatientNurseCall = (state = initialState, action) => {
    if (action.type === GET_RESPONSE) {
        return {...state, response: action.response};
    }

    if (action.type === GET_D_NW_P_N_C_RESULT) {
        if (action.payload.status === 'error') {
            return {...state, response: action.payload};
        }
        return {...state, data: action.payload.results};
    }

    return state;
};

export const monthlyDateWisePatientNurseCall = (state = initialState, action) => {
    if (action.type === GET_RESPONSE) {
        return {...state, response: action.response};
    }

    if (action.type === GET_M_DW_P_N_C_RESULT) {
        if (action.payload.status === 'error') {
            return {...state, response: action.payload};
        }
        return {...state, data: action.payload.results};
    }

    return state;
};


export const monthlyNurseWisePatientNurseCall = (state = initialState, action) => {
    if (action.type === GET_RESPONSE) {
        return {...state, response: action.response};
    }

    if (action.type === GET_M_NW_P_N_C_RESULT) {
        if (action.payload.status === 'error') {
            return {...state, response: action.payload};
        }
        return {...state, data: action.payload.results};
    }

    return state;
};