import { handleApiRequest } from 'Utils/handleApiRequest';

export const COMPANY_UPDATED = 'COMPANY_UPDATED';
export const COMPANY_PHONES = 'COMPANY_PHONES';
export const COMPANY_PHONE = 'COMPANY_PHONE';
export const COMPANY_PHONE_CREATED = 'COMPANY_PHONE_CREATED';
export const COMPANY_PHONE_UPDATED = 'COMPANY_PHONE_UPDATED';
export const COMPANY_ADDRESS = 'COMPANY_ADDRESS';
export const COMPANY_ADDRESS_UPDATED = 'COMPANY_ADDRESS_UPDATED';
export const COMPANY_ADDRESS_CREATED = 'COMPANY_ADDRESS_CREATED';
export const COMPANY_UPDATE_ERRORS = 'COMPANY_UPDATE_ERRORS';
export const COMPANY_PHONE_UPDATE_ERRORS = 'COMPANY_PHONE_UPDATE_ERRORS';
export const COMPANY_ADDRESS_UPDATE_ERRORS = 'COMPANY_ADDRESS_UPDATE_ERRORS';
export const SET_LOGO_UPLOADING = 'SET_LOGO_UPLOADING';
export const REFRESH_LOGO = 'REFRESH_LOGO';
export const COMPANY_PHOTO_CATEGORIES = 'COMPANY_PHOTO_CATEGORIES';
export const FETCHING_COMPANY_PHOTO_CATEGORIES = 'FETCHING_COMPANY_PHOTO_CATEGORIES';
export const COMPANY_PHOTO_CATEGORIES_UPDATED = 'COMPANY_PHOTO_CATEGORIES_UPDATED';

interface ActionTypes {
  COMPANY_UPDATED: boolean;
  COMPANY_PHONES: any;
  COMPANY_PHONE: any;
  COMPANY_PHONE_CREATED: boolean;
  COMPANY_PHONE_UPDATED: boolean;
  COMPANY_ADDRESS: any;
  COMPANY_ADDRESS_CREATED: boolean;
  COMPANY_ADDRESS_UPDATED: boolean;
  COMPANY_UPDATE_ERRORS: any;
  COMPANY_PHONE_UPDATE_ERRORS: any;
  COMPANY_ADDRESS_UPDATE_ERRORS: any;
  SET_LOGO_UPLOADING: boolean;
  REFRESH_LOGO: boolean;
  COMPANY_PHOTO_CATEGORIES: any[];
  COMPANY_PHOTO_CATEGORIES_UPDATED: boolean;
  FETCHING_COMPANY_PHOTO_CATEGORIES: boolean;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type SetCompanyTypes = MessageAction;

export const setCompanyUpdated = (value: boolean) => (dispatch) => {
  dispatch({
    type: COMPANY_UPDATED,
    payload: value,
  });
};

export const setCompanyPhone = (value: any) => (dispatch) => {
  dispatch({
    type: COMPANY_PHONE,
    payload: value,
  });
};

export const setCompanyPhoneCreated = (value: boolean) => (dispatch) => {
  dispatch({
    type: COMPANY_PHONE_CREATED,
    payload: value,
  });
};

export const setCompanyPhoneUpdated = (value: boolean) => (dispatch) => {
  dispatch({
    type: COMPANY_PHONE_UPDATED,
    payload: value,
  });
};

export const setCompanyAddress = (value: any) => (dispatch) => {
  dispatch({
    type: COMPANY_ADDRESS,
    payload: value,
  });
};

export const setCompanyAddressCreated = (value: boolean) => (dispatch) => {
  dispatch({
    type: COMPANY_ADDRESS_CREATED,
    payload: value,
  });
};

export const setCompanyAddressUpdated = (value: boolean) => (dispatch) => {
  dispatch({
    type: COMPANY_ADDRESS_UPDATED,
    payload: value,
  });
};

export const setLogoUploading = (payload: any) => (dispatch) => {
  dispatch({
    type: SET_LOGO_UPLOADING,
    payload,
  });
};

export const resetLogoUploading = (payload: any) => (dispatch) => {
  dispatch({
    type: SET_LOGO_UPLOADING,
    payload,
  });
};

export const setCompanyPhotoCategoriesUpdated = (payload: boolean) => (dispatch) => {
  dispatch({
    type: COMPANY_PHOTO_CATEGORIES_UPDATED,
    payload,
  });
};

/* eslint-disable */
export const getCompanyPhones =
  (companyId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`companies/${companyId}/phones`));

    if (response?.data) {
      const { data } = response;
      dispatch({
        type: COMPANY_PHONES,
        payload: data,
      });
    }
  };

export const createCompanyPhone =
  (companyId: number, requestData) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`companies/${companyId}/phones`, requestData),
      COMPANY_PHONE_UPDATE_ERRORS
    );

    if (response?.data) {
      const { data } = response;
      dispatch(setCompanyPhone(data));
      dispatch(setCompanyPhoneCreated(true));
    }
  };

export const updateCompanyPhone =
  (phoneId: number, requestData = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.put(`phones/${phoneId}`, requestData),
      COMPANY_PHONE_UPDATE_ERRORS
    );

    if (response?.data) {
      const { data } = response;
      dispatch(setCompanyPhone(data));
      dispatch(setCompanyPhoneUpdated(true));
    }
  };

export const createCompanyAddress =
  (companyId: number, requestData) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`companies/${companyId}/addresses`, requestData),
      COMPANY_ADDRESS_UPDATE_ERRORS
    );

    if (response?.data) {
      const { data } = response;
      dispatch(setCompanyAddress(data));
      dispatch(setCompanyAddressCreated(true));
    }
  };

export const updateCompanyAddress =
  (addressId: number, requestData = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.put(`addresses/${addressId}`, requestData),
      COMPANY_ADDRESS_UPDATE_ERRORS
    );

    if (response?.data) {
      const { data } = response;

      dispatch(setCompanyAddress(data));
      dispatch(setCompanyAddressUpdated(true));
    }
  };

export const updateCompanyDetails =
  (companyId: number, requestData = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.put(`companies/${companyId}`, requestData),
      COMPANY_UPDATE_ERRORS
    );

    if (response?.data) {
      if (requestData) {
        dispatch(setCompanyUpdated(true));
      }
    }
  };

export const getCompanyPhotoCategories =
  (companyId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`companies/${companyId}/albums`),
      '',
      FETCHING_COMPANY_PHOTO_CATEGORIES
    );

    if (response?.data) {
      const { data } = response;
      dispatch({
        type: COMPANY_PHOTO_CATEGORIES,
        payload: data,
      });
    }
  };

export const updateCompanyPhotoCategories =
  (categories: any[], setFetching: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    setFetching(true);
    return await Promise.all(
      categories.map((category) => handleApiRequest(dispatch, utils.Api.put(`albums/${category.id}`, category)))
    )
      .then(() => {
        dispatch(setCompanyPhotoCategoriesUpdated(true));
        setFetching(false);
        return true;
      })
      .catch(() => {
        setFetching(false);
        return false;
      });
  };
