// types
import {
  CLEAR_FORGOT_PASSWORD_RESPONSE_MESSAGE,
  FORGOT_PASSWORD_RESPONSE_MESSAGE,
  ForgotPasswordTypes,
} from "./actions";

// state
const initialState = {
  message: "",
};

// we we'll use this for system variables, etc. loaders
export const ForgotPasswordReducer = (state = initialState, action: ForgotPasswordTypes) => {
  switch (action.type) {
    case FORGOT_PASSWORD_RESPONSE_MESSAGE:
      return {
        message: action.payload,
      };
    case CLEAR_FORGOT_PASSWORD_RESPONSE_MESSAGE:
      return initialState;
    default:
      return state;
  }
};
