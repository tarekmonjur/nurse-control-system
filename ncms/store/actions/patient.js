import {GET_RESPONSE} from './actionTypes';

export const getResponse = (payload) => {
    return {
        type: GET_RESPONSE,
        response: payload,
    }
};
