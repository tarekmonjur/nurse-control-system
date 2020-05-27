import {LOADER_START, LOADER_STOP} from './../actions/actionTypes';

export const loading = (state = false, action) => {
  if (action.type === LOADER_START) {
    return true;
  }
  if (action.type === LOADER_STOP) {
    return false;
  }
  return state;
};

