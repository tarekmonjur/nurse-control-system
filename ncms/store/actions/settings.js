import {GET_SETTINGS, UPDATE_SETTINGS} from './actionTypes';

export const getSettings = (payload) => {
    return {
        type: GET_SETTINGS,
        payload,
    }
};

export const updateSettings = (payload) => {
    return {
        type: UPDATE_SETTINGS,
        payload,
    }
};
