import Cookies from 'universal-cookie';
import {
  LOGIN, LOGOUT, TOKEN, BAD_REQUEST, SET_INFLUENCERLIST, SET_USERLIST, SET_CAMPAIGNLIST,
} from './actionTypes';

const cookies = new Cookies();

const initialState = {
  access_token: null,
  user_updated: false,
  badRequest: '',
  loading: true,
  userList: [],
  influencersList: [],
  campaignList: [],
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      cookies.remove('refresh_token');
      return initialState;
    case TOKEN:
      return {
        ...state,
        access_token: action.payload,
      };
    case BAD_REQUEST:
      return {
        ...state,
        badRequest: action.payload,
      };
    case SET_USERLIST:
      return {
        ...state,
        userList: action.payload,
      };
    case SET_INFLUENCERLIST:
      return {
        ...state,
        influencersList: action.payload,
      };
    case SET_CAMPAIGNLIST:
      return {
        ...state,
        campaignList: action.payload,
      };
  }
};

export default reducer;
