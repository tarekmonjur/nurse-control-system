import {GET_BED} from './actionTypes';

export const getBeds = (payload) => {
    return {
        type: GET_BED,
        payload,
    }
};
