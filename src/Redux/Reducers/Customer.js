import { CART, APPOINTMENT } from '../Types';
const intialState = {
    cart: {},
    appointments: []
};
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case CART: {
            return {
                ...state,
                cart: action.payload,
            };
        }
        case APPOINTMENT: {
            return {
                ...state,
                appointments: action.payload,
            };
        }
        default:
            return state;
    }
};
export default reducer;
