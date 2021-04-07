import {
  LOGIN, LOGOUT, TOKEN, ROLE,
} from './actions';

const initialState = {
  isLogged: false,
  role: null,
  access_token: null,
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
  }
};

export default reducer;
