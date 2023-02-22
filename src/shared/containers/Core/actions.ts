// types

export const SET_FETCHING = 'SET_FETCHING';
export const SET_REDIRECT_PATH = 'SET_REDIRECT_PATH';
export const SET_TOASTER = 'SET_TOASTER';
export const SIDE_BAR = 'SIDE_BAR';
export const FORM_ERRORS = 'FORM_ERRORS';
export const RESET_TOAST = 'RESET_TOAST';
export const APP_INITIAL_LOADING = 'APP_INITIAL_LOADING';
export const SET_PUSHER = 'SET_PUSHER';

interface ActionTypes {
  SET_FETCHING: boolean;
  SET_REDIRECT_PATH: string;
  SET_TOASTER: object;
  SIDE_BAR: boolean;
  FORM_ERRORS: any;
  RESET_TOAST: undefined;
  APP_INITIAL_LOADING: boolean;
  SET_PUSHER: any;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type SetCoreTypes = MessageAction;

export const setAppInitialLoading = (payload: any) => (dispatch) => {
  dispatch({
    type: APP_INITIAL_LOADING,
    payload,
  });
};

export const setAppRedirectPathLocal = (value: string) => localStorage.setItem('appRedirectPath', value);
export const getAppRedirectPathLocal = () => localStorage.getItem('appRedirectPath');
export const removeAppRedirectPathLocal = () => localStorage.removeItem('appRedirectPath');

// TODO::ADD THUNKS FOR DIFFERENT TYPES OF SPINNERS

export const setFetching =
  (payload: boolean, type = 'SET_FETCHING') =>
  (dispatch: any) => {
    dispatch({
      type,
      payload,
    });
  };

export const setToaster =
  (message: string, success = true, timeout = 3000) =>
  (dispatch: any) => {
    dispatch({
      type: SET_TOASTER,
      payload: {
        show: true,
        message,
        success,
        timeout,
      },
    });
  };

export const resetToaster = () => async (dispatch: any) => {
  dispatch({
    type: RESET_TOAST,
  });
};

export const setFormErrors =
  (errors: any, type = 'FORM_ERRORS') =>
  (dispatch: any) => {
    dispatch({
      type: type || FORM_ERRORS,
      payload: errors,
    });
  };

export const setPusher = (payload: any) => (dispatch) => {
  dispatch({
    type: SET_PUSHER,
    payload,
  });
};
