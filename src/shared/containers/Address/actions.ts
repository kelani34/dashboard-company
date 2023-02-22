/* eslint-disable */

import { handleApiRequest } from 'Utils/handleApiRequest';

// types
import { CountryModel } from 'Containers/Address/CountryAutocomplete/Models/CountryModel';
import { ProvinceModel } from 'Containers/Address/ProvinceAutocomplete/Models/ProvinceModel';
import { userDetails } from 'Containers/User';
import { projectsCreate } from 'Containers/Projects/actions';
import { setProjectAddressObject, setSimpleProjectAddress } from 'Containers/RocketScan/actions';

export const SET_COUNTRIES = 'SET_COUNTRIES';
export const SET_PROVINCES = 'SET_PROVINCES';
export const SET_ADDRESS_REQUEST = 'SET_ADDRESS_REQUEST';
export const RESET_ADDRESS_REQUEST = 'RESET_ADDRESS_REQUEST';

interface ActionTypes {
  SET_COUNTRIES: Array<CountryModel> | null;
  SET_PROVINCES: Array<ProvinceModel> | null;
  SET_ADDRESS_REQUEST: any;
  RESET_ADDRESS_REQUEST: any;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type SetAddressTypes = MessageAction;

export const listCountries =
  (url = 'countries', type = 'get', requestData = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api[type](url, requestData));

    if (response?.data) {
      const { data } = response;

      dispatch({
        type: SET_COUNTRIES,
        payload: data,
      });
    }
  };

// create address for project
export const addressCreate =
  (requestData = {}, companyId: number, projectStatusId = '', url = 'addresses', type = 'post') =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api[type](url, requestData));

    if (response?.data) {
      const { data } = response;

      dispatch(
        projectsCreate(
          {
            company_id: companyId,
            project_status_id: projectStatusId,
            address_id: data.id,
          },
          `companies/${companyId}/projects`
        )
      );
    }
  };

// update address
export const addressUpdate =
  (addressId: number, requestData = {}, onAddressUpdated?: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.put(`addresses/${addressId}`, requestData));

    if (response?.data) {
      const { data } = response;

      dispatch(setProjectAddressObject(data));
      dispatch(setSimpleProjectAddress(data.address));
    }

    if (onAddressUpdated) {
      onAddressUpdated();
    }
  };

/*
 * Non API thunks
 * */

export const setProvincesList =
  (data = []) =>
  async (dispatch) => {
    dispatch({
      type: SET_PROVINCES,
      payload: data,
    });
  };

export const setAddressRequest =
  (data = {}) =>
  async (dispatch) => {
    dispatch({
      type: SET_ADDRESS_REQUEST,
      payload: data,
    });
  };

export const resetAddressRequest = () => async (dispatch) => {
  dispatch({
    type: RESET_ADDRESS_REQUEST,
  });
};
