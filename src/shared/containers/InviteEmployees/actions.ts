/* eslint-disable */
import { handleApiRequest } from 'Utils/handleApiRequest';

export const SET_INVITE_SENT = 'SET_INVITE_SENT';
export const GET_EMAIL_INVITE = 'GET_EMAIL_INVITE';

interface ActionTypes {
  SET_INVITE_SENT: object;
  GET_EMAIL_INVITE: object;
}

interface Payload {
  email: string;
}

export interface MessageAction {
  type: keyof ActionTypes;
  payload: Payload | undefined;
}

export type sendInviteActionTypes = MessageAction;

export const sendInviteLink =
  (companyId: string, email: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`/dispatch-company-invite/${companyId}`, { email })
    );

    if (typeof response === 'string') {
      dispatch(setInviteSent(true));
    }
  };

export const setInviteSent = (status: boolean) => async (dispatch: any) => {
  dispatch({
    type: SET_INVITE_SENT,
    payload: status,
  });
};

export const getInviteURL =
  (companyId: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`/show-company-invite-urls/${companyId}`));

    if (response?.data) {
      const { data } = response;
      const emailInviteLink = data?.shortened_deep_link?.javascript_redirect;

      dispatch({
        type: GET_EMAIL_INVITE,
        payload: emailInviteLink,
      });
    }
  };
