import {GET_RESPONSE, PATIENT_GET} from './actionTypes';

export const getResponse = (payload) => {
    return {
        type: GET_RESPONSE,
        response: payload,
    }
};

export const getPatients = (payload) => {
    return {
        type: PATIENT_GET,
        data: payload.results,
    }
};
