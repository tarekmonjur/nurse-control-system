import {LOADER_START, LOADER_STOP} from './actionTypes';

export const loader = (data) => {
    return {
        type: data === true ? LOADER_START : LOADER_STOP
    }
};