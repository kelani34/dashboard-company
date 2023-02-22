/* eslint-disable */
//Despite the eslint-disable-next-line being used, the linter is ignoring it on line 25
import { setToaster } from "Containers/Core";
import { handleApiRequest } from "Utils/handleApiRequest";

// types
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const FORGOT_PASSWORD_RESPONSE_MESSAGE = "FORGOT_PASSWORD_RESPONSE_MESSAGE";
export const CLEAR_FORGOT_PASSWORD_RESPONSE_MESSAGE = "FORGOT_PASSWORD_RESPONSE_MESSAGE";
interface ActionTypes {
  FORGOT_PASSWORD: string;
  FORGOT_PASSWORD_RESPONSE_MESSAGE: string;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: string;
}

export const sendResetLinkRequest =
  (email: string, type = "post") =>
  // _getState is prefixed in order to pass linting and the TS compiler.  Remove the _ if you use _getState
  // @ts-ignore
  //  Linter is choking on _getState not being used
  // eslint-disable-next-line
  async (dispatch: any, _getState = null, utils: any) => {
    const data = await handleApiRequest(dispatch, utils.Api[type]("/auth/forgot-password", { email }));
    if (data) {
      const { message } = data;
      dispatch(setToaster(message));
      dispatch({
        type: FORGOT_PASSWORD_RESPONSE_MESSAGE,
        payload: message,
      });
    }
  };

export const clearResetLinkResponseMessage =
  () =>
  async (dispatch: any, _getState = null) => {
    await dispatch({
      type: CLEAR_FORGOT_PASSWORD_RESPONSE_MESSAGE,
    });
  };

export type ForgotPasswordTypes = MessageAction;
