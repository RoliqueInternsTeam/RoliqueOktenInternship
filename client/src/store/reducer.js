import Cookies from 'universal-cookie';
import {
  LOGOUT, TOKEN, ROLE, BAD_REQUEST,
} from './actionTypes';

const cookies = new Cookies();

const initialState = {
  role: null,
  access_token: null,
  badRequest: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case LOGOUT:
      cookies.remove('refresh_token');
      return {
        ...state,
        isLogged: false,
        access_token: null,
        role: null,
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
  }
};

export default reducer;
