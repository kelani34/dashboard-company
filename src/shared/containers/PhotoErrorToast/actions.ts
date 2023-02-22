// types
export const SHOW_TOAST = "SHOW_TOAST";
export const RESET_TOAST = "RESET_TOAST";

interface ActionTypes {
  SHOW_TOAST: object;
  RESET_TOAST: undefined;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export const showToast = () => async (dispatch: any) => {
  dispatch({
    type: SHOW_TOAST,
  });
};

export const resetToast = () => async (dispatch: any) => {
  dispatch({
    type: RESET_TOAST,
  });
};

export type ToastActionTypes = MessageAction;
