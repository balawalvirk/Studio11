import { CART } from '../Types';
export const setCart = (payload) => {
    return {
        type: CART,
        payload: payload,
    };
};
