import { LOGIN, LOGOUT, CUSTOMERTYPE, LOGINSCREENTYPE } from '../Types';
export const login = (payload) => {
  return {
    type: LOGIN,
    payload: payload,
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
export const setCustomerType = (payload) => {
  return {
    type: CUSTOMERTYPE,
    payload: payload,
  };
};
export const setLoginScreenType = (payload) => {
  return {
    type: LOGINSCREENTYPE,
    payload: payload,
  };
};
