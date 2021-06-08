import { ADDNUMBER, SUBNUMBER, MULNUMBER } from '../Types';
export const addnumber = payload => {
    return {
        type: ADDNUMBER,
        payload: payload
    }
};
export const mulnumber = payload => {
    return {
        type: MULNUMBER,
        payload: payload
    }
};
export const subnumber = payload => {
    return {
        type: SUBNUMBER,
        payload: payload
    }
};