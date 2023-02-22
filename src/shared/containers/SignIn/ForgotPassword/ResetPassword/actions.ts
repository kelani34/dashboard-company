import { handleApiRequest } from 'Utils/handleApiRequest';

export const RESET_PASSSWORD = 'RESET_PASSSWORD';
export const CLEAR_PASSWORD_RESET = 'CLEAR_PASSWORD_RESET';
export const PASSWORD_RESET_REDIRECT = 'PASSWORD_RESET_REDIRECT';
interface ActionTypes {
  RESET_PASSSWORD: string;
  CLEAR_PASSWORD_RESET: string;
  PASSWORD_RESET_REDIRECT: boolean;
}

// interface IResetPassword {
//   email: string;
//   token: string;
//   password: string;
//   passwordMessage: string;
//   confirmPasswordMessage: string;
//   redirect: boolean;
// }
export interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export const resetPassword =
  (email: string, password: string, token: string, confirmPassword: string) =>
  // _getState is prefixed in order to pass linting and the TS compiler.  Remove the _ if you use _getState
  // @ts-ignore
  //  Linter is choking on _getState not being used
  // eslint-disable-next-line
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post('/auth/reset-password', {
        email,
        password,
        token,
        password_confirmation: confirmPassword,
      })
    );

    // This will setup the redirect to the login page if the update is successful
    if (response?.message) {
      dispatch({
        type: PASSWORD_RESET_REDIRECT,
        payload: { redirect: true },
      });
    }
  };

export type ResetPasswordTypes = MessageAction;
