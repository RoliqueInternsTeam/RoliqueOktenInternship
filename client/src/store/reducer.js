import {
  LOGIN, LOGOUT, TOKEN, ROLE, BAD_REQUEST,
} from './actionTypes';

const initialState = {
  isLogged: false,
  role: null,
  access_token: null,
  badRequest: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case LOGOUT:
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
