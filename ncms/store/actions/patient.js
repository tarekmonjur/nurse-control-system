import {GET_PATIENT} from './actionTypes';

export const getPatients = (payload) => {
    return {
        type: GET_PATIENT,
        payload,
    }
};
