import {
  BAD_REQUEST, LOGIN, LOGOUT, SET_CAMPAIGNLIST, SET_INFLUENCERLIST, SET_USERLIST, TOKEN,
} from './actionTypes';

export const login = (payload) => ({ type: LOGIN, payload });
export const logout = () => ({ type: LOGOUT });
export const setToken = (payload) => ({ type: TOKEN, payload });
export const setBadRequest = (payload) => ({ type: BAD_REQUEST, payload });
export const setUserList = (payload) => ({ type: SET_USERLIST, payload });
export const setInfluencerList = (payload) => ({ type: SET_INFLUENCERLIST, payload });
export const setCampaignList = (payload) => ({ type: SET_CAMPAIGNLIST, payload });
