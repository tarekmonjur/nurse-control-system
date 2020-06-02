import {GET_RESPONSE, PATIENT_GET} from './../actions/actionTypes';

const initialState = {
    data: null,
    response: null,
    ...window.locals
};

const patient = (state = {}, action) => {
    return state;
};

export const patients = (state = initialState, action) => {
    if (action.type === GET_RESPONSE) {
        return {...state, response: action.response};
    }

    if (action.type === PATIENT_GET) {
        return {...state, data: action.data};
    }

    return state;
};

export default { patients };