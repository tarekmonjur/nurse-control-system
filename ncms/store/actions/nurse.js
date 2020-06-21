import {GET_NURSE} from './actionTypes';

export const getNurses = (payload) => {
    return {
        type: GET_NURSE,
        payload,
    }
};
