// types
import { VALIDATION_ERROR_MESSAGE, CLEAR, SET_TITLE, LoginTypes } from "./actions";

// state
const initialState = { errorMessage: "", title: "Sign In" };
// export const EmailCheckReducer = (state = initialState, action: LoginTypes) => {
export const SignInEmailReducer = (state = initialState, action: LoginTypes) => {
  switch (action.type) {
    case VALIDATION_ERROR_MESSAGE:
      return { registered: action.payload };
    // @ts-ignore  We don't need a payload and Typescript wants a type.
    case CLEAR:
      return initialState;
    case SET_TITLE:
      return { ...state, title: action.payload };
    default:
      return state;
  }
};
