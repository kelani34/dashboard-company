/* eslint-disable */

import { handleApiRequest } from 'Utils/handleApiRequest';

export const VALIDATE_EMAIL = 'VALIDATE_EMAIL';
export const GET_BASIC_COMPANY_INFO = 'GET_BASIC_COMPANY_INFO';
export const SET_VALIDATED = 'SET_VALIDATED';

interface ActionTypes {
  VALIDATE_EMAIL: boolean;
  GET_BASIC_COMPANY_INFO: any;
  SET_VALIDATED: boolean;
}

interface Payload {
  email: string;
  registered: string;
  id: string;
  name: string;
  logo_url: string;
  country_alpha_2: string;
}

export interface MessageAction {
  type: keyof ActionTypes;
  payload: Payload | undefined;
}

export const setEmail =
  (email: string) =>
  // _getState is prefixed in order to pass linting and the TS compiler.  Remove the _ if you use _getState
  // @ts-ignore
  //  Linter is choking on _getState not being used
  // eslint-disable-next-line
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await utils.Api.post('/auth/email-check', { email });

    if (response?.data) {
      const {
        data: { registered },
      } = response;

      dispatch({
        type: VALIDATE_EMAIL,
        payload: {
          registered,
          email,
        },
      });

      dispatch(setValidated(true));
    }
  };

export const getBasicCompanyInfo =
  (companyUuid: string) =>
  // eslint-disable-next-line
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post('/companies/check', {
        uuid: companyUuid,
      })
    );

    if (response?.data) {
      const { data } = response;
      dispatch({
        type: GET_BASIC_COMPANY_INFO,
        payload: data,
      });
    }
  };

// Non API thunks

// This method should not be async.  We want it done before we leave the component
export const setValidated =
  (value: boolean) =>
  // _getState is prefixed in order to pass linting and the TS compiler.  Remove the _ if you use _getState
  (dispatch: any) => {
    dispatch({
      type: SET_VALIDATED,
      payload: value,
    });
  };

export type EmailTypes = MessageAction;
export type BasicCompanyInfoTypes = MessageAction;
