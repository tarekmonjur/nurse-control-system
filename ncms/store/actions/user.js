import {GET_USER} from './actionTypes';

export const getUsers = (payload) => {
    return {
        type: GET_USER,
        payload,
    }
};
