import {
  BAD_REQUEST, EMAIL, ROLE, SET_INFLUENCERLIST, SET_USERLIST, TOKEN,
} from './actionTypes';

export const setToken = (payload) => ({ type: TOKEN, payload });
export const setRole = (payload) => ({ type: ROLE, payload });
export const setEmail = (payload) => ({ type: EMAIL, payload });
export const setBadRequest = (payload) => ({ type: BAD_REQUEST, payload });
export const setUserList = (payload) => ({ type: SET_USERLIST, payload });
export const setInfluencerList = (payload) => ({ type: SET_INFLUENCERLIST, payload });
