import {GET_REAL_TIME_CALL} from './actionTypes';

export const getRealTimeCall = (payload) => {
    return {
        type: GET_REAL_TIME_CALL,
        payload,
    }
};
