/* eslint-disable */

// types
import { SMS_SENT } from 'Containers/SignIn/PhoneVerification/actions';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_AUTHENTICATION_TYPE = 'SET_AUTHENTICATION_TYPE';
export const SOCIAL_LOGIN_ERRORS = 'SOCIAL_LOGIN_ERRORS';
export const SET_RESET_AUTH = 'SET_RESET_AUTH';

interface ActionTypes {
  SET_AUTH_TOKEN: string;
  SET_AUTHENTICATED: boolean;
  SET_AUTHENTICATION_TYPE: string;
  SOCIAL_LOGIN_ERRORS: object;
  SET_RESET_AUTH: string;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type SetAuthTypes = MessageAction;

import { userDetails } from 'Containers/User';
// API
import { handleApiRequest } from 'Utils/handleApiRequest';
import { CODE_VERIFIED } from 'Containers/SignIn/PhoneVerificationCode';
import { createPhoneRecord, SET_USER_STATUS, SET_USER_VERIFICATION } from 'Containers/User/actions';

export const login =
  (url: string, type = 'post', requestData = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const data = await handleApiRequest(dispatch, utils.Api[type](url, requestData));
    if (data) {
      const { token } = data;
      // update the axios headers
      utils.Api.setAuthorizationToken(token);

      // we'll fetch user details on a successful sign in and set redux variable for route changes
      dispatch(userDetails());

      // set the redux state with the token --sanctum auth bearer token
      dispatch({
        type: SET_AUTH_TOKEN,
        payload: token,
      });
    }
  };

export const register =
  (url = 'auth/register', type = 'post', requestData = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const data = await handleApiRequest(dispatch, utils.Api[type](url, requestData));
    if (data) {
      const { token } = data;
      // update the axios headers
      utils.Api.setAuthorizationToken(token);

      dispatch(userDetails());

      // set the redux state with the token --sanctum auth bearer token
      dispatch({
        type: SET_AUTH_TOKEN,
        payload: token,
      });

      // set the redux state with the authentication status
      dispatch({
        type: SET_AUTHENTICATED,
        payload: true,
      });
    }
  };

export const smsSendVerification =
  (url = 'auth/sms-send-verification', type = 'post', requestData: any, userID: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const data = await handleApiRequest(dispatch, utils.Api[type](url, requestData));

    if (typeof data === 'string') {
      const { phone } = requestData;

      // create a phone record so we can attach it to the user
      dispatch(
        createPhoneRecord(
          'phones',
          'post',
          {
            value: phone,
            extension: '',
            is_primary: true,
            type: 'mobile',
          },
          userID
        )
      );

      dispatch({
        type: SMS_SENT,
        payload: true,
      });
    }
  };

export const smsVerifyCode =
  (url = 'auth/sms-verify-code', type = 'post', requestData = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const data = await handleApiRequest(dispatch, utils.Api[type](url, requestData));

    if (typeof data === 'string') {
      dispatch({
        type: CODE_VERIFIED,
        payload: true,
      });
    }
  };

export const logout =
  (url = 'auth/logout') =>
  async (dispatch, _getState = null, utils) => {
    // clear the axios headers
    utils.Api.resetAuthorizationToken();

    await utils.Api.delete(url, {});

    // clear auth data
    dispatch({
      type: SET_RESET_AUTH,
    });

    // clear user data, important for route changes
    dispatch({
      type: SET_USER_VERIFICATION,
      payload: {
        authenticated: false,
        sms: false,
        company: false,
        approved: false,
        isNew: false,
      },
    });
  };
