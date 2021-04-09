import {
  BAD_REQUEST, LOGIN, ROLE, TOKEN,
} from './actionTypes';

export const login = () => ({ type: LOGIN });
export const setToken = (payload) => ({ type: TOKEN, payload });
export const setRole = (payload) => ({ type: ROLE, payload });
export const setBadRequest = (payload) => ({ type: BAD_REQUEST, payload });
