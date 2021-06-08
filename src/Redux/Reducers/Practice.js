import { multiply } from 'react-native-reanimated';
import { ADDNUMBER, MULNUMBER, SUBNUMBER } from '../Types';
const intialState = {
    // number: {
    // },
    count: 0
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case ADDNUMBER: {

            console.log(action.payload)
            return {
                ...state,
                count: Number(state.count) + Number(action.payload)
            }
        }
        case SUBNUMBER: {
            return {
                ...state,
                count: state.count - action.payload,
            }
        }
        case MULNUMBER: {
            return {
                ...state,
                count: Number(state.count) * Number(action.payload),
            }
        }
        default:
            return state

    }
}
export default reducer;