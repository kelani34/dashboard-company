export const SET_ACTIVE_PROJECT = 'SET_ACTIVE_PROJECT';
export const SET_MOBILE_WARNING_MODAL_SHOWN = 'SET_MOBILE_WARNING_MODAL_SHOWN';

interface ActionTypes {
  SET_ACTIVE_PROJECT: string;
  SET_MOBILE_WARNING_MODAL_SHOWN: boolean;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: string | number | boolean | null;
}

export type setActiveProjectTypes = MessageAction;

/*
 * NON-API THUNKS
 * */

export const setActiveProject = (value: any) => async (dispatch: any) => {
  dispatch({
    type: SET_ACTIVE_PROJECT,
    payload: value,
  });
};

export const setMobileWarningModalShown = (state: any) => (dispatch: any) => {
  dispatch({
    type: SET_MOBILE_WARNING_MODAL_SHOWN,
    payload: state,
  });
};
