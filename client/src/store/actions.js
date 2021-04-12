import {
  BAD_REQUEST, ROLE, TOKEN,
} from './actionTypes';

export const setToken = (payload) => ({ type: TOKEN, payload });
export const setRole = (payload) => ({ type: ROLE, payload });
export const setBadRequest = (payload) => ({ type: BAD_REQUEST, payload });
