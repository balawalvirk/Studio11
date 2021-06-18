import Auth from './Auth';
import practice from './Practice';
import member from './Member';
import Barber from './Barber';
import Customer from './Customer';
import { combineReducers } from 'redux';

export default combineReducers({
  Auth: Auth,
  Practice: practice,
  Member: member,
  Barber: Barber,
  Customer: Customer,
});
