import { ADDUSER, DELUSER, UPDATEUSER, READUSER } from '../Types';
const intialState = {
    user: [],
    formSubmitted: false
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case ADDUSER: {
            let addUser = [...state.user];
            const index = addUser.findIndex(item => item.Email == action.payload.Email);
            console.log('index is' + index)
            console.log('result is' + action.payload)
            if (index === -1) {
                addUser = [...addUser, action.payload]
            }
            else {
                addUser[index] = action.payload
                // addUser = [...addUser, action.payload]

            }
            return {
                ...state,
                user: addUser,
                formSubmitted: false
            }
        }
        case DELUSER: {
            let allUsers = [...state.user];
            const specificUser = allUsers.findIndex(item => item.Email == action.payload);
            if (specificUser != -1) {
                console.log('how to del that specific ' + specificUser)
                allUsers.splice(specificUser, 1);
            } else {
                console.log('item does not exit')
            }
            return {
                ...state,
                user: allUsers,
                formSubmitted: false
            }
        }
        case UPDATEUSER: {
            let addUser = [...state.user];
            const index = addUser.findIndex(item => item.Email == action.payload.Email);
            if (index != -1) {
                addUser = [...addUser, action.payload]
            }
            return {
                ...state,
                user: addUser,
            }
        }
        case READUSER: {
            return {
                ...state,
                user: action.payload.userdetails,
                formSubmitted: false
            }
        }
        default:
            return state

    }
}
export default reducer;