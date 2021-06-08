import { ADDUSER, DELUSER, UPDATEUSER, READUSER } from '../Types';
export const adduser = payload => {
    return {
        type: ADDUSER,
        payload: payload
    }
};
export const deluser = payload => {
    return {
        type: DELUSER,
        payload: payload
    }
};
export const updateuser = payload => {
    return {
        type: UPDATEUSER,
        payload: payload
    }
};
export const readuser = payload => {
    return {
        type: READUSER,
        payload: payload
    }
};