import { CART } from '../Types';
const intialState = {
    cart: []
};
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case CART: {
            return {
                ...state,
                cart: action.payload,
            };
        }
        default:
            return state;
    }
};
export default reducer;
