import Cookies from 'universal-cookie';
import {
  LOGOUT, TOKEN, ROLE, BAD_REQUEST, SET_INFLUENCER, SET_USERLIST, SET_INFLUENCERLIST, SET_USER,
} from './actionTypes';

const cookies = new Cookies();

const initialState = {
  role: null,
  access_token: null,
  badRequest: false,
  userList: [],
  influencersList: [],
  user: {},
  influencer: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case LOGOUT:
      cookies.remove('refresh_token');
      return {
        ...state,
        access_token: null,
        role: null,
        badRequest: false,
      };
    case TOKEN:
      return {
        ...state,
        access_token: action.payload,
      };
    case ROLE:
      return {
        ...state,
        role: action.payload,
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
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_INFLUENCER:
      return {
        ...state,
        influencer: action.payload,
      };
  }
};

export default reducer;
