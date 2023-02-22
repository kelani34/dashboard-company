// types
import {
  SET_FETCHING,
  SET_REDIRECT_PATH,
  SET_TOASTER,
  SIDE_BAR,
  FORM_ERRORS,
  RESET_TOAST,
  SetCoreTypes,
  APP_INITIAL_LOADING,
  SET_PUSHER,
} from 'Containers/Core/actions';

// state
const initialState = {
  fetching: false,
  redirectPath: '/',
  toast: {
    show: false,
    message: '',
    icon: false,
    success: true,
    timeout: 3000,
  },
  sideBar: false,
  formErrors: {},
  appInitialLoading: true,
  pusher: undefined,
};

// we we'll use this for system variables, etc. loaders
export const CoreReducer = (state = initialState, action: SetCoreTypes) => {
  const { type, payload } = action;

  switch (type) {
    case SET_FETCHING:
      return {
        ...state,
        fetching: payload,
      };
    case SET_REDIRECT_PATH:
      return {
        ...state,
        redirectPath: payload,
      };
    case SET_TOASTER:
      return {
        ...state,
        toast: {
          ...state.toast,
          ...payload,
        },
      };
    case SIDE_BAR:
      return {
        ...state,
        sideBar: payload,
      };
    case FORM_ERRORS:
      return {
        ...state,
        formErrors:
          typeof payload === 'object'
            ? {
                ...payload,
              }
            : payload,
      };
    case APP_INITIAL_LOADING:
      return {
        ...state,
        appInitialLoading: payload,
      };
    case SET_PUSHER:
      return {
        ...state,
        pusher: payload,
      };
    case RESET_TOAST: {
      return initialState;
    }
    default:
      return state;
  }
};
