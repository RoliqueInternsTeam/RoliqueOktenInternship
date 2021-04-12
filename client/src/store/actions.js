import {
  BAD_REQUEST, ROLE, SET_INFLUENCER, SET_INFLUENCERLIST, SET_USER, SET_USERLIST, TOKEN,
} from './actionTypes';

export const setToken = (payload) => ({ type: TOKEN, payload });
export const setRole = (payload) => ({ type: ROLE, payload });
export const setBadRequest = (payload) => ({ type: BAD_REQUEST, payload });
export const setUserList = (payload) => ({ type: SET_USERLIST, payload });
export const setInfluencerList = (payload) => ({ type: SET_INFLUENCERLIST, payload });
export const setUser = (payload) => ({ type: SET_USER, payload });
export const setInfluencer = (payload) => ({ type: SET_INFLUENCER, payload });
