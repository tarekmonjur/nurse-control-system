import {
    GET_D_DW_P_N_C, GET_D_DW_P_N_C_RESULT, GET_D_NW_P_N_C, GET_D_NW_P_N_C_RESULT,
    GET_M_DW_P_N_C, GET_M_DW_P_N_C_RESULT, GET_M_NW_P_N_C, GET_M_NW_P_N_C_RESULT,
} from './actionTypes';

export const getDailyDateWisePatientNurseCall = (payload) => {
    return {
        type: GET_D_DW_P_N_C,
        payload,
    }
};

export const getDailyDateWisePatientNurseCallResult = (payload) => {
    return {
        type: GET_D_DW_P_N_C_RESULT,
        payload,
    }
};

export const getDailyNurseWisePatientNurseCall = (payload) => {
    return {
        type: GET_D_NW_P_N_C,
        payload,
    }
};

export const getDailyNurseWisePatientNurseCallResult = (payload) => {
    return {
        type: GET_D_NW_P_N_C_RESULT,
        payload,
    }
};





export const getMonthlyDateWisePatientNurseCall = (payload) => {
    return {
        type: GET_M_DW_P_N_C,
        payload,
    }
};

export const getMonthlyDateWisePatientNurseCallResult = (payload) => {
    return {
        type: GET_M_DW_P_N_C_RESULT,
        payload,
    }
};

export const getMonthlyNurseWisePatientNurseCall = (payload) => {
    return {
        type: GET_M_NW_P_N_C,
        payload,
    }
};

export const getMonthlyNurseWisePatientNurseCallResult = (payload) => {
    return {
        type: GET_M_NW_P_N_C_RESULT,
        payload,
    }
};




