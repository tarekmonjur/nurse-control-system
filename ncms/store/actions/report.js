import {
    GET_D_P_N_C,
    GET_D_P_N_C_RESULT,
    GET_M_P_N_C,
    GET_M_P_N_C_RESULT,
} from './actionTypes';

export const getDailyPatientNurseCall = (payload) => {
    return {
        type: GET_D_P_N_C,
        payload,
    }
};

export const getDailyPatientNurseCallResult = (payload) => {
    return {
        type: GET_D_P_N_C_RESULT,
        payload,
    }
};

export const getMonthlyPatientNurseCall = (payload) => {
    return {
        type: GET_M_P_N_C,
        payload,
    }
};

export const getMonthlyPatientNurseCallResult = (payload) => {
    return {
        type: GET_M_P_N_C_RESULT,
        payload,
    }
};




