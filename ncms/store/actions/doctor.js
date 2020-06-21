import {GET_DOCTOR} from './actionTypes';

export const getDoctors = (payload) => {
    return {
        type: GET_DOCTOR,
        payload,
    }
};
