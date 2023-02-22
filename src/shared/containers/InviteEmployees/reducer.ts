import { SET_INVITE_SENT, GET_EMAIL_INVITE, sendInviteActionTypes } from './actions';

const initialState = {
  sent: false,
  emailInviteLink: undefined,
};

export const employeeInviteReducer = (state = initialState, action: sendInviteActionTypes) => {
  const { type, payload } = action;
  switch (type) {
    case SET_INVITE_SENT:
      return {
        ...state,
        sent: payload,
      };
    case GET_EMAIL_INVITE:
      return {
        ...state,
        emailInviteLink: payload,
      };
    default:
      return state;
  }
};
