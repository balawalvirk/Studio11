import { CART, APPOINTMENT } from '../Types';
export const setCart = (payload) => {
    return {
        type: CART,
        payload: payload,
    };
};
export const setAppointments = (payload) => {
    return {
        type: APPOINTMENT,
        payload: payload,
    };
};
