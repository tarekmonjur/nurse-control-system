import {
    GET_RESPONSE,
    LOADER_START,
    LOADER_STOP,
    GET_DATA,
    DELETE_DATA
} from './actionTypes';

export const loader = (data) => {
    return {
        type: data === true ? LOADER_START : LOADER_STOP
    }
};

export const getResponse = (payload) => {
    return {
        type: GET_RESPONSE,
        response: payload,
    }
};

export const getData = (payload) => {
    return {
        type: GET_DATA,
        payload
    }
};

export const deleteData = (id) => {
    return {
        type: DELETE_DATA,
        id
    }
};