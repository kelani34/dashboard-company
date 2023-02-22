export const VALIDATION_ERROR_MESSAGE = "VALIDATION_ERROR_MESSAGE";
export const CLEAR = "CLEAR";
export const SET_TITLE = "SET_TITLE";

interface ActionTypes {
  VALIDATION_ERROR_MESSAGE: string;
  CLEAR: undefined;
  SET_TITLE: string;
}

export interface MessageAction {
  type: keyof ActionTypes;
  payload: string | undefined;
}

export const setErrorMessage =
  (errorMessage: string) =>
  // _getState is prefixed in order to pass linting and the TS compiler.  Remove the _ if you use _getState
  // @ts-ignore
  //  Linter is choking on _getState not being used
  // eslint-disable-next-line
  async (dispatch: any, _getState = null, utils: any) => {
    dispatch({
      type: VALIDATION_ERROR_MESSAGE,
      payload: errorMessage,
    });
  };

// This method should not be async.  We want it done before we leave the component
export const clear =
  () =>
  // _getState is prefixed in order to pass linting and the TS compiler.  Remove the _ if you use _getState
  (dispatch: any) => {
    dispatch({
      type: CLEAR,
    });
  };

export const setTitle =
  (title: string) =>
  // _getState is prefixed in order to pass linting and the TS compiler.  Remove the _ if you use _getState
  (dispatch: any) => {
    dispatch({
      type: SET_TITLE,
      payload: title,
    });
  };

export type LoginTypes = MessageAction;
