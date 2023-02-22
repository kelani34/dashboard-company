// type
import { RESET_PASSSWORD, CLEAR_PASSWORD_RESET, PASSWORD_RESET_REDIRECT, ResetPasswordTypes } from "./actions";

// state
const initialState = {
  token: "",
  email: "",
  password: "",
  redirect: false,
};

export const ResetPasswordReducer = (state = initialState, action: ResetPasswordTypes) => {
  switch (action.type) {
    case RESET_PASSSWORD:
      const { token, email, password } = action.payload;
      return {
        ...state,
        token,
        email,
        password,
      };
    case PASSWORD_RESET_REDIRECT:
      return { ...state, redirect: action.payload };
    case CLEAR_PASSWORD_RESET:
      return initialState;

    default:
      return state;
  }
};
