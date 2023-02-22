// types
import { handleApiRequest } from 'Utils/handleApiRequest';
import { UserModel } from 'Containers/User/Models/UserModel';
import { UserPhonesModel } from 'Containers/User/Models/UserPhonesModel';
import { UserCompaniesModel } from 'Containers/User/Models/UserCompaniesModel';
import { UserFeatureFlagsModel } from 'Containers/User/Models/UserFeatureFlagsModel';
import { COMPANY_ATTACHED, USER_UPDATED } from 'Containers/SignIn/SignUpUserInformation/actions';
import { setAppInitialLoading } from 'Containers/Core/actions';
import { USER_PHONE_UPDATED } from 'Containers/SignIn/PhoneVerification/actions';

export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const SET_USER_STATUS = 'SET_USER_STATUS';
export const USER_PHONES = 'USER_PHONES';
export const USER_COMPANIES = 'USER_COMPANIES';
export const FIRST_COMPANY_ID = 'FIRST_COMPANY_ID';
export const SET_USER_COMPANY = 'SET_USER_COMPANY';
export const SET_USER_VERIFICATION = 'SET_USER_VERIFICATION';
export const USER_UPDATE_ERRORS = 'USER_UPDATE_ERRORS';
export const SET_AVATAR_UPLOADING = 'SET_AVATAR_UPLOADING';
export const REFRESH_AVATAR = 'REFRESH_AVATAR';
export const SET_USER_PHONE_DETAILS = 'SET_USER_PHONE_DETAILS';
export const GOT_USER_PHONES = 'GOT_USER_PHONES';
export const SET_USER_FEATURE_FLAGS = 'SET_USER_FEATURE_FLAGS';
export const SET_COMPANY_EMPLOYEE_ROLES = 'SET_COMPANY_EMPLOYEE_ROLES';
interface ActionTypes {
  SET_USER_DETAILS: UserModel;
  SET_USER_STATUS: string;
  USER_PHONES: Array<UserPhonesModel>;
  USER_COMPANIES: Array<UserCompaniesModel>;
  FIRST_COMPANY_ID: number;
  SET_USER_COMPANY: any;
  SET_USER_VERIFICATION: any;
  USER_UPDATE_ERRORS: any;
  SET_AVATAR_UPLOADING: boolean;
  REFRESH_AVATAR: boolean;
  SET_USER_PHONE_DETAILS: any;
  GOT_USER_PHONES: boolean;
  SET_USER_FEATURE_FLAGS: Array<UserFeatureFlagsModel>;
  SET_COMPANY_EMPLOYEE_ROLES: any[];
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type SetUserTypes = MessageAction;

/* eslint-disable */
export const userDetails =
  (initialCall = false, isFirstTimer = false) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const authenticated = true;
    let sms = false;
    let companyExists = false;
    let approved = false;

    const response = await handleApiRequest(dispatch, utils.Api.get('auth/user', {}));

    if (response?.data) {
      const { data } = response;
      // set the redux state for the user details
      dispatch({
        type: SET_USER_DETAILS,
        payload: data,
      });

      // user phone verification status
      sms = !!data.sms_verified_at;

      // if the user has companies we'll do the below actions
      if (data?.companies?.length > 0) {
        const { companies } = data;
        const [company] = companies;

        // set the company id to load projects
        dispatch({
          type: FIRST_COMPANY_ID,
          payload: company.id,
        });

        // set company true for route change
        companyExists = true;

        if (company.approved_at) {
          // set company approved true for route change
          approved = true;
        }
      }

      dispatch({
        type: SET_USER_VERIFICATION,
        payload: {
          authenticated, // authenticated is always true
          sms, // this could be true or false
          company: companyExists, // company could be true or false
          approved, // company approved is also true or false
          isNew: isFirstTimer,
        },
      });

      if (initialCall) {
        dispatch(setAppInitialLoading(false));
      }
    } else {
      if (initialCall) {
        dispatch(setAppInitialLoading(false));
      }
    }
  };

export const updateUser =
  (url = '', type = 'put', requestData = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api[type](url, requestData), USER_UPDATE_ERRORS);

    if (response?.data) {
      dispatch({
        type: USER_UPDATED,
        payload: true,
      });

      if (requestData) {
        dispatch(setUserUpdated(true));
      }
    }
  };

export const updateUserAndAttachToCompany =
  (userId, companyId, requestData = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.put(`users/${userId}`, requestData));

    if (response?.data) {
      dispatch(attachUserCompany(userId, companyId));
    }
  };

export const createPhoneRecord =
  (url = 'phones', type = 'post', requestData = {}, userID: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const { data } = await handleApiRequest(dispatch, utils.Api[type](url, requestData));

    if (data) {
      // attach a phone to the user
      dispatch(
        attachUserPhone(
          `users/${userID}/phones/${data.id}`,
          'post',
          {
            phone: data.value,
          },
          userID
        )
      );

      dispatch({
        type: SET_USER_PHONE_DETAILS,
        payload: data,
      });

      if (requestData) {
        dispatch(setUserPhoneUpdated(true));
      }
    }
  };

export const createCompanyRecord =
  (url = '', type = 'post', requestData = {}, userID: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api[type](url, requestData), 'COMPANY_NAME_ERRORS');

    if (response?.data) {
      const { data } = response;
      // attach a company to the user
      dispatch(
        attachUserCompany(userID, data.id, {
          phone: data.value,
        })
      );
    }
  };

export const attachUserPhone =
  (url = '', type = 'post', requestData = {}, userID) =>
  async (dispatch: any, _getState = null, utils: any) => {
    await handleApiRequest(dispatch, utils.Api[type](url, requestData));

    // called here because of async functions
    dispatch(userPhones(`users/${userID}/phones`, 'get'));
  };

export const detachUserPhone =
  (url = '', type = 'post', requestData = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    await handleApiRequest(dispatch, utils.Api[type](url, requestData));
  };

export const userPhones =
  (url = '', type = 'get', requestData = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const data: UserPhonesModel = await handleApiRequest(dispatch, utils.Api[type](url, requestData));
    if (data) {
      dispatch({
        type: USER_PHONES,
        payload: data,
      });
    }
  };

export const userCompanies =
  (url = '', type = 'get', requestData = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const data: UserCompaniesModel = await handleApiRequest(dispatch, utils.Api[type](url, requestData));

    if (data) {
      dispatch({
        type: USER_COMPANIES,
        payload: data,
      });
    }
  };

export const attachUserCompany =
  (userId, companyId, requestData = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`companies/${companyId}/users/${userId}`, requestData)
    );

    if (typeof response === 'string') {
      dispatch({
        type: COMPANY_ATTACHED,
        payload: true,
      });

      dispatch(userDetails());
    }
  };

export const userFeatureFlags =
  () =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get('auth/user/feature-flags', {}));
    if (response?.data) {
      const { data } = response;
      // set the redux state for the user feature flags
      dispatch({
        type: SET_USER_FEATURE_FLAGS,
        payload: data,
      });
    }
  };

export const listCompanyEmployeeRoles =
  (companyId: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`/companies/${companyId}/roles`, {}));

    if (response?.data) {
      const { data } = response;

      dispatch({
        type: SET_COMPANY_EMPLOYEE_ROLES,
        payload: data,
      });
    }
  };

export const sendReactivationClick =
  (userId: number, reactionTime: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    return handleApiRequest(
      dispatch,
      utils.Api.post(`users/${userId}/freemium-click`, {
        details: JSON.stringify({
          button: 'reactivate_now',
          platform: 'web',
          reaction_time: reactionTime,
        }),
      })
    );
  };

/**
 * Non-API thunks
 */

export const setUserUpdated = (value: boolean) => (dispatch) => {
  dispatch({
    type: USER_UPDATED,
    payload: value,
  });
};

export const setUserPhoneUpdated = (value: boolean) => (dispatch) => {
  dispatch({
    type: USER_PHONE_UPDATED,
    payload: value,
  });
};
export const setAvatarUploading = (payload: any) => (dispatch) => {
  dispatch({
    type: SET_AVATAR_UPLOADING,
    payload,
  });
};

export const resetAvatarUploading = (payload: any) => (dispatch) => {
  dispatch({
    type: SET_AVATAR_UPLOADING,
    payload,
  });
};
