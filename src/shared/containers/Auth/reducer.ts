// types
import {
  SET_AUTH_TOKEN,
  SET_AUTHENTICATED,
  SET_AUTHENTICATION_TYPE,
  SET_RESET_AUTH,
  SetAuthTypes,
  SOCIAL_LOGIN_ERRORS,
} from './actions';

// state
const initialState = {
  token: '',
  authenticated: false,
  authenticationType: 'basic',
  socialLoginErrors: {
    errors: false,
    message: '',
  },
};

export const AuthReducer = (state = initialState, action: SetAuthTypes) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: action.payload,
      };
    case SET_AUTHENTICATION_TYPE:
      return {
        ...state,
        authenticationType: action.payload,
      };
    case SOCIAL_LOGIN_ERRORS:
      return {
        ...state,
        socialLoginErrors: {
          ...state.socialLoginErrors,
          ...action.payload,
        },
      };
    case SET_RESET_AUTH:
      return initialState;
    default:
      return state;
  }
};
