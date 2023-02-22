// types
import { SHOW_TOAST, RESET_TOAST, ToastActionTypes } from "./actions";

// state
const initialState = {
  show: false,
  timeout: 6000,
};

export const PhotoErrorToastReducer = (state = initialState, action: ToastActionTypes) => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        show: true,
      };
    case RESET_TOAST: {
      return initialState;
    }
    default:
      return state;
  }
};
