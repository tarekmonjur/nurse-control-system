import {GET_SETTINGS} from './actionTypes';

export const getSettings = (payload) => {
    return {
        type: GET_SETTINGS,
        payload,
    }
};
