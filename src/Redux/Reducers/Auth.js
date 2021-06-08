import { LOGIN, LOGOUT, CUSTOMERTYPE, LOGINSCREENTYPE } from '../Types';
const intialState = {
    user: {
    },
    isLogin: false,
    customerType: '',
    loginScreenType: ''
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                user: action.payload,
                isLogin: true
            }
        }
        case LOGOUT: {
            return {
                ...state,
                user: {},
                isLogin: false
            }
        }
        case CUSTOMERTYPE: {
            return {
                ...state,
                customerType: action.payload,
            }
        }
        case LOGINSCREENTYPE: {
            return {
                ...state,
                loginScreenType: action.payload,
            }
        }
        default:
            return state

    }
}
export default reducer;