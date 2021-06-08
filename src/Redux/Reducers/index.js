import Auth from './Auth'
import practice from './Practice'
import member from './Member'
import { combineReducers } from 'redux'

export default combineReducers({
    Auth: Auth,
    Practice: practice,
    Member: member,
});
