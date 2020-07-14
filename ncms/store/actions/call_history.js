import {GET_CALL_HISTORY} from './actionTypes';

export const getCallHistories = (payload) => {
    return {
        type: GET_CALL_HISTORY,
        payload,
    }
};
